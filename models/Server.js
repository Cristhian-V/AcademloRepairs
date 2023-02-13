const express = require('express')
const cors = require('cors')
const { db } = require('../database/config')
const { globalErrorHandler } = require('../controllers/error.controller')
const { AppError } = require('../utils/appError')

class Server {
  constructor(){
    this.app = express()
    this.port = process.env.PORT

    this.routes()
    this.database()
  }

  routes(){

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

    db.sync()
      .then(()=> console.log('sincronizadion exitosa'))
  }

  listen(){
    this.app.listen(this.port, () => {
      console.log(`Estamos escuchando por el puerto ${this.port}`)
    })
  }

}

module.exports = Server