const Joi=require('joi')

const postStuffSchema=Joi.object({
    first_name:Joi.string().required(),
    last_name:Joi.string().required()
})
module.exports=postStuffSchema