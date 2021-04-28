const ApiError = require('../errors/apiError')
const brandService = require('../services/brandService')

class BrandController{
    async create(req,res){
        const brands = await brandService.create(req.body)
        res.json(brands)
    }
    async getAll(req,res){
        const brands = await brandService.getAll()
        res.json(brands)
    }
}

module.exports = new BrandController()
