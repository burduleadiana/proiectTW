const sequelize = require("../sequelize");
const { DataTypes } = require("sequelize");

const Resource = sequelize.define("resource", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  link: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
});

module.exports = Resource;
