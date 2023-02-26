const { Router } = require("express");
const { check } = require("express-validator");
const { looginOk, createUser, updatePassword } = require("../controllers/auth.controllers");
const { validUserData, validUserExist, protec } = require("../middlewares/auth.middleware");
const { validRole } = require("../middlewares/users.middleware");
const { validData } = require("../middlewares/validData.middleware");

const router = Router()

router.post('/login',
[
  check('email', 'dato email es obligatorio').not().isEmpty(),
  check('email', 'formato incorrecto').isEmail(),
  check('password', 'dato password es obligatorio').not().isEmpty(),
  validData,
  validUserData,
],
  looginOk
)

router.post('/',
[
  check('name', 'dato nombre es oblogatorio').not().isEmpty(),
  check('email', 'dato email es obligatorio').not().isEmpty(),
  check('email', 'formato incorrecto').isEmail(),
  check('password', 'dato password es obligatorio').not().isEmpty(),
  check('role', 'dato rol es obligatorio').not().isEmpty(),
  validData,
  validRole,
  validUserExist,
],
createUser
)

router.patch('/password/:id',
[
  check('email', 'dato email es obligatorio').not().isEmpty(),
  check('email', 'formato incorrecto').isEmail(),
  check('password', 'dato password es obligatorio').not().isEmpty(),
  check('newPassword', 'dato password es obligatorio').not().isEmpty(),
  check('newPasswordRep', 'dato password es obligatorio').not().isEmpty(),
  validData,
  protec,
  validUserData,
],
updatePassword
)

module.exports = {
  routerAuth: router
}