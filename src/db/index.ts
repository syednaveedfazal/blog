import { Sequelize } from "sequelize";
import sqlite3 from "sqlite3";

export const sequelize = new Sequelize({
  dialect: "sqlite",
  dialectModule: sqlite3,
  storage: "./blog.sqlite",
});

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database has been synced");
  })
  .catch((error) => {
    console.error("Unable to sync database", error);
  });

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });