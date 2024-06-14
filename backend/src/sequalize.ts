import { Sequelize } from "@sequelize/core";
import { PostgresDialect } from "@sequelize/postgres";

import { CronRecord } from "./models/cron-record.model";
import { Log } from "./models/log.model";

const sequelizeConfig = {
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  ssl: process.env.DB_SSL === "true",
  clientMinMessages: "notice",
  define: {
    timestamps: false,
  },
};
console.log(sequelizeConfig);

export const sequelize = new Sequelize({
  ...sequelizeConfig,
  models: [Log, CronRecord],
  dialect: PostgresDialect,
});

export const initDB = async function () {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
