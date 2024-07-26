const ctrls = require('../controllers/user')
const router = require('express').Router()
const joi = require("joi")
const {stringReq, numberReq} = require('../middlewares/joiSchema')
const validateDto = require('../middlewares/validation')
const { verifyToken } = require('../middlewares/verifyToken')

router.get('/current', verifyToken, ctrls.getCurrent)
router.get('/roles', ctrls.getRoles)

module.exports = router