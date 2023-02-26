const Users = require("../models/Users.model");
const { catchAsync } = require("../utils/catchAsync");
const bcrypt = require('bcryptjs');
const generateJWT = require("../utils/jwt");


const looginOk = catchAsync( async( req, res, next) => {
  const token = await generateJWT(req.userDB.Id)
  return res.status(200).json(token)
})

const createUser = catchAsync(async(req,res,next) =>{
  let { name, email, password, role } = req.body
  const user = new Users({ name, email, password, role })

  name = name.toLowerCase()
  email = email.toLowerCase()

  const salt = await bcrypt.genSalt(10)
  user.password = await bcrypt.hash(password, salt)

  await user.save()

  const token = await generateJWT(user.id)

  return res.status(200).json(token)
})

const updatePassword = catchAsync(async(req, res, next)=>{
  const {newPassword} = req.body
  const {userDB} = req
  const salt = await bcrypt.genSalt(10)
  const encriptNewPass = await bcrypt.hash(newPassword, salt)

  await userDB.update({
    password: encriptNewPass
  })

  return res.status(200).json('Se actulizo la contraseña con exito')
})

module.exports = {
  looginOk, createUser, updatePassword
}