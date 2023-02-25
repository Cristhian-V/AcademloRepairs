class AppError extends Error{
  constructor(message, statusCode){
    super(message)
    
    this.message = message
    this.statusCode = statusCode
    console.log('aqui')
    this.status = `${statusCode}`.startsWith('4')?'error' : 'fail'
    this.isOperational = true

    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = { AppError }