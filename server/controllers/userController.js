const ApiError = require('../errors/apiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User,Cart} = require('../models/model')
const {validationResult} = require('express-validator')

const generateToken = (id,email,role) => {

    return jwt.sign({id,email,role} ,
        process.env.SECRET_KEY,
        {expiresIn: "24h"})
}


class UserController{
    async registration(req,res,next){
        const {email, password, role} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Incorect email-ul ori parola'))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('User cu asa email exista'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, role, password: hashPassword})
        const basket = await Cart.create({userId: user.id})
        const token = generateToken(user.id, user.email, user.role)
        return res.json({token})
    }
    async login(req,res,next){
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.internal('Nu a fost gasit asa user'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Parola incorecta'))
        }
        const token = generateToken(user.id, user.email, user.role)
        return res.json({token})
    }
    async check(req,res,next){
        const token = generateToken(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }
}

module.exports = new UserController()
