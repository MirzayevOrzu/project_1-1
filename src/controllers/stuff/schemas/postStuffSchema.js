const Joi=require('joi')

const postStuffSchema=Joi.object({
    first_name:Joi.string().required(),
    last_name:Joi.string().required(),
    role:Joi.string().valid('teacher','assistent_teacher','admin','super_admin').required(),
    password:Joi.string().min(5).max(10).required(),
    username:Joi.string().min(5).max(10).required()
})
module.exports=postStuffSchema