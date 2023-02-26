const repairs = require("../models/repairs.model");
const Users = require("../models/Users.model");
const { AppError } = require("../utils/appError");
const { catchAsync } = require("../utils/catchAsync");

const repairIdExist = catchAsync(async(req, res, next) =>{
  
  const repair = await repairs.findOne({where:{
    Id: req.params.id
  }})
  console.log(repair)
  if(!repair){
    return next(new AppError('El id requerido no existe', 400))
  }

  if(repair.status != 'pending'){
    return next(new AppError('La cita solicitada no esta en estado pendiente', 400))
  }

  req.repair = repair
  next()
})

const routesEmploye = catchAsync(async(req, res, next) => {
  const user = await Users.findOne({
    where:{
      Id: req.decoded.id,
      role: 'employe'
    }
  })

  if(!user) return next(new AppError('logueate como usuario con rol enploye para ver esta informacion'))


  next()
})

module.exports = {
  repairIdExist, routesEmploye
}