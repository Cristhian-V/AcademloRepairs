const Users = require("../models/Users.model");
const { catchAsync } = require("../utils/catchAsync");

const findAllUsers = catchAsync( async(req, res, next)=> {
  const users = await Users.findAll({where:{
    status: true
  }})
  return res.status(200).json(users)
})

const findUser = catchAsync( async(req, res, next) => {
  return res.status(200).json(req.user)
})

const updateUser = catchAsync(async(req, res, next) =>{
  const updateUser = await Users.update({
    name:req.body.name,
    email:req.body.email
    },{
      where: {
        Id:req.params.id
      }
    }
  )
  return res.status(200).json('usuario actulizo con exito')
})

const deleteUser = catchAsync(async(req, res, next) => {
  const updateUser = await Users.update({
    status: false
    },{
      where: {
        Id:req.params.id
      }
    }
  )
  return res.status(200).json('usuario eliminado con exito')
})

module.exports = {
  findAllUsers, findUser, updateUser, deleteUser
}