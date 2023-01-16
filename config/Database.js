import { Sequelize } from "sequelize";

const db = new Sequelize("dbzalihe_157", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
