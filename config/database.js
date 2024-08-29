const { Sequelize } = require("sequelize");
const path = require("path");
const fs = require("fs");

const configPath = path.resolve(__dirname, "config.json");
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));

const environment = process.env.NODE_ENV || "development";
const dbConfig = config[environment];

const sequelize = new Sequelize(dbConfig);

module.exports = sequelize;
