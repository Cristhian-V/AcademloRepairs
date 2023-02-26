const { Router } = require("express");
const { check } = require("express-validator");
const { findAllRepairs, findRepair, crateCite, updateStatus, deleteRepair } = require("../controllers/repairs.controller");
const { protec } = require("../middlewares/auth.middleware");
const { repairIdExist, routesEmploye } = require("../middlewares/repairs.middleware");
const { userIdExist } = require("../middlewares/users.middleware");
const { validData } = require("../middlewares/validData.middleware");

const router = Router()

//rutas protejidas por TOKEN y valido el Id desde el token para verificar que el id del usuario que solicita sea de un empleado con routesEmploye

router.get('/', protec, routesEmploye, findAllRepairs)

router.get('/:id', repairIdExist,protec, routesEmploye, findRepair)

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

router.patch('/:id', repairIdExist, protec, routesEmploye, updateStatus)

router.delete('/:id', repairIdExist, protec, routesEmploye, deleteRepair)

module.exports = {
  repairsRouter: router
}