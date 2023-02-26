const Users = require("../models/Users.model")
const { AppError } = require("../utils/appError")
const { catchAsync } = require("../utils/catchAsync")
const bcrypt = require('bcryptjs')
const generateJWT = require("../utils/jwt")
const jwt = require("jsonwebtoken")
const {promisify} = require('util')



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

const validTokenById = catchAsync(async(req, res, next) =>{
  const { id } = req.params 
  const { userDB } = req
  const userById = await Users.findOne({
    where:{
      Id:id
  }})

  console.log(id, req.userDB.Id)
  const token1 = await generateJWT(id)
  const token2 = await generateJWT(userDB.Id)
  let sonIguales = false
  if(token1 === token2) sonIguales = true
  console.log(sonIguales)

  //return next( new AppError('Solo puede actulizar la contraseña el propietario de la misma por favor ingrese con la cuenta correcta', 401))
})

const protec = catchAsync(async(req, res, next) => {
  let token
  if( 
    req.headers.authorization &&
    `${req.headers.authorization}`.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  }

  if(!token) return next(new AppError('No estas logeado', 401))
  
  const decoded = await promisify(jwt.verify)(token, process.env.SECRET_JWT_SEED)

  console.log(decoded)

  const user = Users.findOne({
    where:{
      Id: decoded.id,
      status: true
    }
  })

  if(!user) return next (new AppError('Token Invalido Por favor logueate nuevamente'))
  
  req.decoded = decoded

  next()
})

module.exports = {
  validUserData, validUserExist, protec
}
