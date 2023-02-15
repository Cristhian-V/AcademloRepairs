const Users = require("../models/Users.model");
const { AppError } = require("../utils/appError");
const { catchAsync } = require("../utils/catchAsync");

const userIdExist = catchAsync(async(req, res, next) =>{
  let user
  //Verifica que exista el usuario tanto si viene de las rutas de usuario o repairs
  if(req.params.id){
    user = await Users.findOne({where:{
      Id: req.params.id
    }})
  }else{
    user = await Users.findOne({where:{
      Id: req.body.userId
    }})
  }


  if(!user){
    return next('El usuario requerido no existe', 400)
  }

  req.user = user
  next()
})

const validRole = catchAsync( async(req, res, next) =>{
  if(req.body.role === 'client' || req.body.role === 'employe'){
    next()
  }else{
    return next(new AppError('solo se permite client o employe en el dato ROLE'))
  }
})

module.exports = {
  userIdExist, validRole
}