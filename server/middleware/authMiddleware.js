const ApiError = require('../errors/apiError')
const jwt = require('jsonwebtoken')
module.exports = function (req,res,next) {
    if(req.method === 'OPTIONS'){
        next()
    }
    try{
        const token = req.headers.authorization.split(' ')[1] // BEARER
        if(!token){
            return next(ApiError.neauthenticationUser('Nu esti autorizat'))
        }
        const secret_key = process.env.SECRET_KEY
        const decode_token = jwt.verify(token,secret_key)
        req.user = decode_token
        next()
    }catch (e){
        return next(ApiError.forbidden('Nu esti autoriza'))
    }
}
