const repairs = require("../models/repairs.model");
const { AppError } = require("../utils/appError");
const { catchAsync } = require("../utils/catchAsync");

const findAllRepairs = catchAsync(async(req, res, next) =>{
  const allRepairs = await repairs.findAll({where:{
    status:'pending'
  }})

  return res.status(200).json(allRepairs)
})

const findRepair = catchAsync( async(req, res, next) =>{
  const repair = await repairs.findOne({where:{
    status:'pending'
  }})

  return res.status(200).json(repair)
})

const crateCite = catchAsync(async(req, res, next) =>{
  const repair = await repairs.create({
    date: req.body.date,
    UserId: req.body.userId,
    motorsNumber: req.body.motorsNumber,
    description: req.body.description
  })

  return res.status(200).json('Cita creada con exito')
})

const updateStatus = catchAsync(async(req, res, next) =>{
  const reapirUpdate = await repairs.update({
    status: 'completed'
  },{
    where:{
      Id: req.params.id
    }
  })
  return res.status(200).json('Cita actualizada con exito')
})

const deleteRepair = catchAsync(async(req, res, next) => {
  const reapirDelete = await repairs.update({
    status: 'cancelled'
  },{
    where:{
      Id: req.params.id
    }
  })
  return res.status(200).json('Cita eliminada con exito')
})

module.exports = {
  findAllRepairs, findRepair, crateCite, updateStatus, deleteRepair
}