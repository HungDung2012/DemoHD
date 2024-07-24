// tao cau noi giua client va server

const ctrls = require('../controllers/auth')
const router = require('express').Router()
const joi = require("joi")
const validateDto = require('../middlewares/validation')
const {stringReq, numberReq, string} = require('../middlewares/joiSchema')


router.post(
    "/signup",
    validateDto(
        joi.object({
            password: stringReq, 
            name: stringReq, 
            phone:numberReq,
            roleCode: string,
        })
    ),
    ctrls.register
)

router.post(
    "/signin",
    validateDto(
        joi.object({
            password: stringReq, 
            phone: numberReq,
        })
    ),
    ctrls.signIn
)

module.exports = router