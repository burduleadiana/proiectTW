const sequelize = require("../sequelize");
const { DataTypes } = require("sequelize");

const StudyGroup = sequelize.define("studygroup", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = StudyGroup;
