const ctrls = require('../controllers/propertyType')
const router = require('express').Router()
const joi = require("joi")
const {stringReq, numberReq, string} = require('../middlewares/joiSchema')
const validateDto = require('../middlewares/validation')
const { verifyToken, isAdmin } = require('../middlewares/verifyToken')


router.post(
    '/', 
    verifyToken, 
    isAdmin, 
    validateDto(
        joi.object({name: stringReq, description: stringReq, image: stringReq})
    ),
    ctrls.createNewPropertyType
)

router.get('/', ctrls.getPropertyTypes)
router.patch(
    '/:id', 
    verifyToken, 
    isAdmin, 
    validateDto(joi.object({ name: string, description: string, image: string })), 
    ctrls.updatePropertyTypes
)
router.delete('/:id', verifyToken, isAdmin, ctrls.removePropertyTypes)


module.exports = router