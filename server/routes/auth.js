// tao cau noi giua client va server

const ctrls = require('../controllers/auth')
const router = require('express').Router()
const joi = require("joi")
const {stringReq, numberReq} = require('../middlewares/joiSchema')
const validateDto = require('../middlewares/validation')

router.post(
    "/register",
    validateDto(
        joi.object({ password: stringReq, name: stringReq, phone:numberReq })
    ),
    ctrls.register
)

module.exports = router