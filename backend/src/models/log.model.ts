import { Model, DataTypes } from "@sequelize/core";
import {
  AutoIncrement,
  PrimaryKey,
  Attribute,
  NotNull,
  Default,
} from "@sequelize/core/decorators-legacy";

type LogAttributes = {
  id: number;
  message: string;
  timestamp: Date;
};

type LogCreationAttributes = Omit<LogAttributes, "id">;

export class Log extends Model<LogAttributes, LogCreationAttributes> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  public id!: number;

  @Attribute(DataTypes.STRING)
  @NotNull
  public message!: string;

  @Attribute(DataTypes.DATE)
  @Default(DataTypes.NOW)
  public timestamp!: Date;
}
