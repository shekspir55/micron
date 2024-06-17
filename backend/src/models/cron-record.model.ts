import { Model, DataTypes } from "@sequelize/core";
import {
  AutoIncrement,
  Index,
  PrimaryKey,
  Attribute,
  NotNull,
  BeforeSave,
  AfterSave,
} from "@sequelize/core/decorators-legacy";
import type { PartialBy } from "@sequelize/utils";

import { getNextRunTime } from "../helpers/chron-util";
import { log } from "../helpers/logger";

export type CronRecordAttributes = {
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

  @BeforeSave
  static updateRecordNextRunTime(cronRecord: CronRecord) {
    cronRecord.nextRunTime = getNextRunTime(cronRecord.schedule);
  }

  @AfterSave
  static logRecordUpdate(cronRecord: CronRecord) {
    log(
      "Cron job with id: " +
        cronRecord.id +
        " scheduled with: " +
        cronRecord.schedule +
        " will run at: " +
        cronRecord.nextRunTime
    );
  }
}
