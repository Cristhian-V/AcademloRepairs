const express = require('express')
const cors = require('cors')
const { db } = require('../database/config')
const { globalErrorHandler } = require('../controllers/error.controller')
const { AppError } = require('../utils/appError')
const { usersRouter } = require('../routes/users.route')
const initModel = require('./init.model')
const { repairsRouter } = require('../routes/repairs.route')
const { routerAuth } = require('../routes/auth.routes')

class Server {
  constructor(){
    this.app = express()
    this.port = process.env.PORT

    this.path = {
      users:'/api/v1/users',
      repairs:'/api/v1/repairs',
      auth:'/api/v1/auth'
    }

    
    this.middlewares()
    this.database()
    this.routes()
  }

  routes(){
    this.app.use(this.path.users, usersRouter)
    this.app.use(this.path.repairs, repairsRouter)
    this.app.use(this.path.auth, routerAuth)

    this.app.all('*', (req, res, next) =>{
      return next(
        new AppError(`la Ruat solicitada ${req.originalUrl} no se encuentra en este servidor` , 404)
      )
    })

    this.app.use(globalErrorHandler)
  }

  middlewares(){
    this.app.use(cors())
    this.app.use(express.json())
  }

  database(){
    db.authenticate()
      .then(()=>console.log('autenticacion exitosa'))
      .catch(err=>console.log(err))

    initModel()

    db.sync()
      .then(()=> console.log('sincronizadion exitosa'))
      .catch(err=>console.log(err))
  }

  listen(){
    this.app.listen(this.port, () => {
      console.log(`Estamos escuchando por el puerto ${this.port}`)
    })
  }

}

module.exports = Server