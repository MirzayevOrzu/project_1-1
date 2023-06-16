const Joi = require("joi");

const loginStuffSchema=Joi.object({
    username:Joi.string().min(5).max(10).required(),
    password:Joi.string().min(5).max(10).required()
})

module.exports=loginStuffSchema