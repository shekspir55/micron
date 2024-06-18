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
  declare id: number;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare message: string;

  @Attribute(DataTypes.DATE)
  @Default(DataTypes.NOW)
  declare timestamp: Date;
}
