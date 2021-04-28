const {Type} = require('../models/model')

class TypeController{
    async create(type){
        const types = await Type.create(type)
        return types
    }
    async getAll(){
        const types = await Type.findAll()
        return types
    }
}
module.exports =new TypeController()
