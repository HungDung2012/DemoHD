const joi = require('joi')

exports.string = joi.string().allow(null, '')
exports.stringReq = joi.string().required()
exports.numberReq = joi.number().required()
exports.number = joi.string().allow(null, '')
exports.array = joi.array().allow(null, '')
exports.arrayReq = joi.array().required()


