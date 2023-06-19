const Joi=require('joi')
const patchGroupSchema=Joi.object({
    name:Joi.string(),
    teacher_id:Joi.number().integer(),
    assisent_teacher_id:Joi.number().integer()
})
module.exports=patchGroupSchema