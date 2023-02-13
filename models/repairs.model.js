const { DataTypes } = require("sequelize");
const { db } = require("../database/config");

const repairs = db.define( 'repairs', {
  Id : {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER
  },
  date : {
    allowNull: false,
    type: DataTypes.DATE
  },
  status : {
    allowNull: false,
    defaultValue: 'pending',
    type: DataTypes.STRING
  },
  userId : {
    allowNull: false,
    type: DataTypes.INTEGER
  }
})