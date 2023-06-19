const Joi=require('joi')
const postGroupSchema=Joi.object({
    name:Joi.string().required(),
    teacher_id:Joi.number().integer(),
    assisent_teacher_id:Joi.number().integer()
})
module.exports=postGroupSchema