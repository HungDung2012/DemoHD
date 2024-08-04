const asyncHandler = require('express-async-handler')
const db = require('../models')
const redis = require('../config/redis.config')

module.exports = {
    createNewProperty: asyncHandler(async(req, res) => {
        const { uid } = req.user
        const response = await db.User.User.create
        return res.json({
            success:Boolean(response),
            mes: response ? 'Got.' : 'Cannot get user.',
            currentUser: response,
        })
        
    }),
    
    getProperties: asyncHandler(async(req, res) => {
        const { limit, page, fields, name, sort, ...query } = req.query
        const options = {}
        // Limit Fields
        if(fields) {
            const attributes = fields.split(',')
            const isExclude = attributes.some(el => el.startsWith('-'))
            if(isExclude) options.attributes = {
                exclude: attributes.map(el => el.replace("-", ""))
            }
            else options.attributes = attributes
        }

        // Filter by client queries
        // if(name) 
        //     query.name = Sequelize.where(
        //         Sequelize.fn('LOWER', Sequelize.col('name')) , "LIKE" , `%${name.toLocaleLowerCase()}%`  // WHERE name LIKE %name% // House => ou
        //     ) 

        // Sort
        // order = [[createdAt, ASC], [name, DESC]]
        // [createdAt, -name] 
        // sort: createdAt, -name
        if(sort){
            const order = sort
                .split(',')
                .map(el => 
                    el.startsWith('-') ? [el.elreplace("-", ""), 'DESC'] : [el, 'ASC']
                )
            
            options.order = order
        }
        
        // Filter by client queries
        if(!limit){
            const alreadyGetAll = await redis.get('get-properties')
            if(alreadyGetAll) 
                return res.json({
                    success: true,
                    mes: 'Got.',
                    properties: JSON.parse(alreadyGetAll),
                })
            const response = await db.Property.findAll({
                where: query,
                ...options,
            })
            redis.set('get-properties', JSON.stringify(response))
            return res.json({
                success: response.length > 0,
                mes: response.length > 0 ? 'Got.' : 'Cannot get properties.',
                properties: response,
            })
        }
        // Pagination
        const prevPage = page - 1 > 0 ? page - 1 : 1
        const offset = (prevPage - 1) * limit
        if(offset) options.offset = offset
        options.limit = +limit
        const response = await db.Property.findAndCountAll({
            where: query,
            ...options,
            include: [
                {
                    model: db.User, 
                    as: 'rPostedBy', 
                    attributes: ["avatar", "phone", "name", "email"],
                },
                {
                    model: db.User, 
                    as: 'rOwner', 
                    attributes: ["avatar", "phone", "name", "email"],
                },
            ],
        }) 
        return res.json({
            success: Boolean(response),
            mes: response.length > 0 ? 'Got.' : 'Cannot get properties.',
            properties: response,
        })
        
    })
}

