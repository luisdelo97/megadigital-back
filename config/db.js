import Sequelize from "sequelize";

const db = new Sequelize(process.env.DATABASE, "root", "111097", {
  host: process.env.HOST_DB,
  port: "3306",
  dialect: "mysql",
  define: {
    timestamps: false,
    freezeTableName: true,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  operatorAliases: false,
});

const testConnection = async () => {
  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export { testConnection };

export default db;
