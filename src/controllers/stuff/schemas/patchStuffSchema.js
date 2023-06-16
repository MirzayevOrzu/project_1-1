const Joi=require('joi')

const patchStuffSchema=Joi.object({
    first_name:Joi.string(),
    last_name:Joi.string(),
    role:Joi.string().valid('teacher','assistent_teacher','admin','super_admin'),
    password:Joi.string().min(5).max(10),
    username:Joi.string().min(5).max(10)
})
module.exports=patchStuffSchema


