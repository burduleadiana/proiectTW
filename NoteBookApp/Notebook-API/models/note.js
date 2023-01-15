const sequelize = require("../sequelize");
const { DataTypes } = require("sequelize");
const { now } = require("sequelize/dist/lib/utils");

const Note = sequelize.define("note", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  activityType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  activityNumber: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  activityDate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Note;
