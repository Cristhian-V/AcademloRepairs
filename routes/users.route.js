const {Router} = require('express')
const { check } = require('express-validator')
const { findAllUsers, findUser, createUser, updateUser, deleteUser } = require('../controllers/users.controller')
const { protec } = require('../middlewares/auth.middleware')
const { userIdExist, validRole } = require('../middlewares/users.middleware')
const { validData } = require('../middlewares/validData.middleware')

const router = Router()

router.get('/',findAllUsers)

router.get('/:id', userIdExist ,findUser)

router.patch('/:id',
[
  check('name', 'dato nombre es oblogatorio').not().isEmpty(),
  check('email', 'dato email es obligatorio').not().isEmpty(),
  check('email', 'formato incorrecto').isEmail(),
  validData,
  userIdExist,
  protec,
],
updateUser
)

router.delete('/:id', userIdExist, protec, deleteUser)

module.exports = {
  usersRouter: router
}