const { Router } = require("express");
const { check } = require("express-validator");
const { findAllRepairs, findRepair, crateCite, updateStatus, deleteRepair } = require("../controllers/repairs.controller");
const { repairIdExist } = require("../middlewares/repairs.middleware");
const { userIdExist } = require("../middlewares/users.middleware");
const { validData } = require("../middlewares/validData.middleware");

const router = Router()

router.get('/', findAllRepairs)

router.get('/:id', repairIdExist, findRepair)

router.post('/',
[
  check('date','Fecha de cita es obligatorio').not().isEmpty(),
  check('date','Formato incorrecto').isDate(),
  check('motorsNumber','Numero de motor es obligatorio').not().isEmpty(),
  check('description','Descripcion es ogligatorio').not().isEmpty(),
  check('userId','userId es obligatorio').not().isEmpty(),
  validData,
  userIdExist,
],
crateCite
)

router.patch('/:id', repairIdExist, updateStatus)

router.delete('/:id', repairIdExist, deleteRepair)

module.exports = {
  repairsRouter: router
}