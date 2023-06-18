const Joi=require('joi')

const patchStudentSchema=Joi.object({
    first_name:Joi.string(),
    last_name:Joi.string()
})
module.exports=patchStudentSchema


