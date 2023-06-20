const Joi=require('joi')

const postDirectionSchema=Joi.object({
    name:Joi.string().required()
})
module.exports=postDirectionSchema