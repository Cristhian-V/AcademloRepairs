const {Router} = require('express')
const { check } = require('express-validator')
const { findAllUsers, findUser, createUser, updateUser, deleteUser } = require('../controllers/users.controller')
const { userIdExist, validRole } = require('../middlewares/users.middleware')
const { validData } = require('../middlewares/validData.middleware')

const router = Router()

router.get('/',findAllUsers)

router.get('/:id', userIdExist ,findUser)

router.post('/',
[
  check('name', 'dato nombre es oblogatorio').not().isEmpty(),
  check('email', 'dato email es obligatorio').not().isEmpty(),
  check('email', 'formato incorrecto').isEmail(),
  check('password', 'dato password es obligatorio').not().isEmpty(),
  check('role', 'dato rol es obligatorio').not().isEmpty(),
  validData,
  validRole,
],
createUser
)

router.patch('/:id',
[
  check('name', 'dato nombre es oblogatorio').not().isEmpty(),
  check('email', 'dato email es obligatorio').not().isEmpty(),
  check('email', 'formato incorrecto').isEmail(),
  validData,
  userIdExist,
],
updateUser
)

router.delete('/:id', userIdExist, deleteUser)

module.exports = {
  usersRouter: router
}