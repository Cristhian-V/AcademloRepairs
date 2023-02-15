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
  motorsNumber : {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  description : {
    allowNull: false,
    type: DataTypes.STRING
  },
  status : {
    allowNull: false,
    defaultValue: 'pending',
    type: DataTypes.STRING
  },
  UserId : {
    allowNull: false,
    type: DataTypes.INTEGER
  }
},{
  timestamps:false
})

module.exports = repairs