const asyncHandler = require('express-async-handler')
const db = require('../models')
const { throwErrorWithStatus } = require('../middlewares/errorHandler')

module.exports = {
    getCurrent: asyncHandler(async(req, res) => {
        const { uid } = req.user
        const response = await db.User.findByPk(uid, {
            nest: false,
            attributes: {
                exclude: ['password'],
            },
            include: [
                { 
                    model: db.User_Role, 
                    attributes: ['roleCode'] , 
                    as: 'userRoles', 
                    include: [{ model: db.Role, as: 'roleName', attributes: ['value'] }] 
                }
            ],
        })
        return res.json({
            success:Boolean(response),
            mes: response ? 'Got.' : 'Cannot get user.',
            currentUser: response,
        })
        
    }),
    getRoles: asyncHandler(async(req, res) => {
        const response = await db.Role.findAll({
            attributes: ['code', 'value'],
        })
        return res.json({
            success:Boolean(response),
            mes: response ? 'Got.' : 'Cannot get roles.',
            roles: response,
        })
        
    }),
}

