import { Model, DataTypes } from "@sequelize/core";
import {
  AutoIncrement,
  Index,
  PrimaryKey,
  Attribute,
  NotNull,
} from "@sequelize/core/decorators-legacy";
import type { PartialBy } from "@sequelize/utils";

type CronRecordAttributes = {
  id: number;
  schedule: string;
  nextRunTime: Date;
};

type CronRecordCreationAttributes = PartialBy<CronRecordAttributes, "id">;

export class CronRecord extends Model<
  CronRecordAttributes,
  CronRecordCreationAttributes
> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  public id!: number;

  @Attribute(DataTypes.STRING)
  @NotNull
  public schedule!: string;

  @Attribute(DataTypes.DATE)
  @Index({ name: "b-tree" }) // for a fast range search
  public nextRunTime!: Date;
}
