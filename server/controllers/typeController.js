const ApiError = require('../errors/apiError')
const typeService = require('../services/typeService')

class TypeController{
    async create(req,res){
        const type = await typeService.create(req.body)
        res.json(type)
    }
    async getAll(req,res){
        const types = await typeService.getAll()
        res.json(types)
    }
}
module.exports =new TypeController()
