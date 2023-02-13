const { DataTypes } = require('sequelize')
const { db } = require("../database/config");

const Users = db.define( 'Users' ,{
  Id : {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER
  },
  name : {
    allowNull: false,
    type: DataTypes.STRING
  },
  email : {
    allowNull: false,
    type: DataTypes.STRING
  },
  password : {
    allowNull: false,
    type: DataTypes.STRING
  },
  role : {
    allowNull: false,
    type: DataTypes.STRING
  },
  status : {
    allowNull: false,
    defaultValue: true,
    type: DataTypes.BOOLEAN
  }
})

module.exports = Users