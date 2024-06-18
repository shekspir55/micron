import { Sequelize } from "@sequelize/core";
import { PostgresDialect } from "@sequelize/postgres";

import { CronRecord } from "./models/cron-record.model";
import { Log } from "./models/log.model";

export const initDB = async function () {
  const sequelizeConfig = {
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    clientMinMessages: "notice",
    define: {
      timestamps: false,
    },
  };


  const sequelize = new Sequelize({
    ...sequelizeConfig,
    models: [Log, CronRecord],
    dialect: PostgresDialect,
  });

  await sequelize.authenticate();
  console.log("Database Connection has been established successfully.");

  // Remove in real production
  await sequelize.sync({});
  return sequelize;
};
