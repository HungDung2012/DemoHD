const asyncHandler = require('express-async-handler')

const register = asyncHandler(async(req, res) => {
    // client gui len bang urlencoded hoac formdata => req.body
    // client gui len bang params (!q=dadlandlan) => req.query
    // client api/user/:id => req.params

    // DTO: Data Transfer Object
    const { password, phone, name, role } = req.body
    // handle logic
    return res.json({
        success: true,
        mes: 'Api oke',
        data: {
            password,
            phone,
            name,
            role
        },
    })
})


module.exports = {
    register,
}

