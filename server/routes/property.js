const ctrls = require('../controllers/property')
const router = require('express').Router()
const joi = require("joi")
const {stringReq, numberReq, string} = require('../middlewares/joiSchema')
const validateDto = require('../middlewares/validation')
const { verifyToken, isAdmin } = require('../middlewares/verifyToken')
const rateLimiter = require('../middlewares/rateLimiter')

router.use(rateLimiter)
router.get('/', ctrls.getProperties)

module.exports = router