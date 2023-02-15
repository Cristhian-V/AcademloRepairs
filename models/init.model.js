const Users = require('./Users.model')
const repairs = require('./repairs.model')

const initModel = () =>{
  Users.hasMany(repairs)
  repairs.belongsTo(Users)
}

module.exports = initModel