const Joi=require('joi')

const patchDirectionSchema=Joi.object({
    name:Joi.string().required()
})
module.exports=patchDirectionSchema


