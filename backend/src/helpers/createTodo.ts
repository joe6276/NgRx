import Joi from 'joi'

export const ProductSchema =Joi.object({
    product_name:Joi.string().required(),
    product_desc:Joi.string().required(),
    price:Joi.number().required()
})