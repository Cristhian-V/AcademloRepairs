const Users = require("../models/Users.model")
const { AppError } = require("../utils/appError")
const { catchAsync } = require("../utils/catchAsync")
const bcrypt = require('bcryptjs')



const validUserData = catchAsync( async(req, res, next) =>{
  const email = req.body.email.toLowerCase()
  const {password} = req.body
  const userDB = await Users.findOne({where:{
    email
  }})

  if(!userDB) return next(new AppError('el usuario no existe', 400))
  if(!(await bcrypt.compare(password, userDB.password))) return next(new AppError('contraseña incorrecta', 400))
  
  req.userDB = userDB

  next()
})

const validUserExist = catchAsync( async(req, res, next) =>{
  const {email} = req.body
  const userDB = await Users.findOne({
    where:{
      email
    }
  })

  if(userDB) return next(new AppError('El correo ya se encuentra registrado', 400))
  
  next()
})

const validToken = catchAsync(async(req, res, next) =>{
  
})

module.exports = {
  validUserData, validUserExist, validToken
}