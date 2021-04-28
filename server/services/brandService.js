const {Brand} = require('../models/model')

class BrandService{
    async create(brand){
        const brands = await Brand.create(brand)
        return brands
    }
    async getAll(){
        const brands = await Brand.findAll()
        return brands
    }
}

module.exports = new BrandService()
