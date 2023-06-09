import { Sequelize } from "sequelize";

const db = new Sequelize("sarym", "erramos", "JjCP@86Gjj69", {
  host: "146.148.100.168",
  dialect: "mysql",
});

export default db;
