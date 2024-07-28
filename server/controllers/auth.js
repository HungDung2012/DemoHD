const asyncHandler = require('express-async-handler')
const db = require('../models')
const { throwErrorWithStatus } = require('../middlewares/errorHandler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { where } = require('sequelize')

const register = asyncHandler(async(req, res) => {
    // client gui len bang urlencoded hoac formdata => req.body
    // client gui len bang params (!q=dadlandlan) => req.query
    // client api/user/:id => req.params

    // DTO: Data Transfer Object
    const { phone, name, password } = req.body
    // handle logic
    const response = await db.User.findOrCreate({
        where: { phone },
        defaults: {
            phone, name, password,
        },
    })
    const userId = response[0]?.id
    
    if(userId){
        const roleCode = ['ROL7']
        if(req.body?.roleCode) roleCode.push(req.body?.roleCode)
        const roleCodeBulk = roleCode.map((role) => ({ userId, roleCode: role }))
        const updateRole = await db.User_Role.bulkCreate(roleCodeBulk)
        if(!updateRole) await db.destroy({ where: { id: userId }})
    }
    return res.json({
        success: response[1],
        mes: response[1] ? 'Your account is created' : 'PhoneNumber is already had exists',
    })
    
})
const signIn = asyncHandler(async(req, res, next) => {
    try {
        const { phone, password } = req.body
        const user = await db.User.findOne({
            where: { phone },
        })
        if(!user) return throwErrorWithStatus(401, 'Login Failed!', res, next)
        const isMachingPassword = bcrypt.compareSync(password, user.password)
        if(!isMachingPassword) return throwErrorWithStatus(401, 'Login Failed!', res, next)
        
        const token = jwt.sign(
            { uid: user.id, roleCode: user.roleCode }, 
            process.env.JWT_SECRET, 
            { expiresIn: '7d' }
        )
        return res.json({
            success: true,
            mes: "Sign in is successfully.",
            accessToken: token,
        })
    
    } catch (error) {
        console.log(error)
    }
})


module.exports = {
    register,
    signIn,
}

