class ErroHandler extends Error{
    constructor(message,statuscode){
        super(message)
        this.statuscode = statuscode

        Error.captureStackTrace(this,this.constructor)
    }
}

// console.log(ErroHandler)

module.exports = ErroHandler