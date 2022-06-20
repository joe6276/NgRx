import mssql from 'mssql'
import dotenv from 'dotenv'
 dotenv.config()
 import { ProductSchema } from '../helpers/createTodo'
import configuration from "../config/config"
import { RequestHandler } from 'express'
import{v1 as uuid} from 'uuid'



export const getProductbyID: RequestHandler<{id:string}>= async(req,res,next)=>{
    try {
    const pool = await mssql.connect(configuration);
    const id =req.params.id
    const product= await pool.request()
    .input('id', mssql.VarChar(300),id )
    .execute('getProduct')
        if(!product.recordset[0]){
            res.json({message:"No Product Found"})
        }else{
            res.json(product.recordset[0])
        }
      
    } catch (error:any) {
        res.json(error.message)
    }
    }

export const getProducts: RequestHandler= async(req,res,next)=>{
    try {
        const pool = await mssql.connect(configuration);
    
    const products= await pool.request()
    .execute('getProducts')
    
     res.json(products.recordset)
    } catch (error:any) {
        res.json(error.message)
    }
    
}



export const createProduct:RequestHandler=async( req, res)=>{
 try {
    const id =uuid()

    const {product_name, product_desc, price}= req.body as {product_name:string,product_desc:string,price:number}
    const {error} =ProductSchema.validate(req.body)

    if(error){
        return res.json({error:error.details[0].message})
    }
    let pool= await mssql.connect(configuration)

    await  pool.request()
    .input('id' ,mssql.VarChar , id)
    .input('product_name' ,mssql.VarChar , product_name)
    .input('product_desc' ,mssql.VarChar , product_desc)
    .input('price' ,mssql.Int , price)
    .execute('createProduct')

    res.json({message:'Product Created Successfully'})
 } catch (error:any) {
     res.json(error.message)
 }
}

export const updateProduct:RequestHandler<{id:string}>=async (req,res)=>{
 try {
    const id= req.params.id

    const {product_name, product_desc, price}= req.body as {product_name:string,product_desc:string,price:number}
    const {error} =ProductSchema.validate(req.body)
    if(error){
        return res.json({error:error.details[0].message})
    }
    let pool= await mssql.connect(configuration)

    let product= await pool.request().query(`SELECT * FROM ProductTable WHERE id='${id}'`)
    if(!product.recordset[0]){
        return res.json({message: 'Unallowed to Update'})
    }
    await pool.request()
    .input('id' ,mssql.VarChar , id)
    .input('product_name' ,mssql.VarChar , product_name)
    .input('product_desc' ,mssql.VarChar , product_desc)
    .input('price' ,mssql.Int , price)
    .execute('updateProduct')

    res.json({
        message:'Product Updated Successfully !!!1'
    })
 } catch (error:any) {
     res.json({error:error.message})
 }

}

export const deleteProduct:RequestHandler<{id:string}>= async(req,res)=>{
 try {
    const id= req.params.id
    let pool= await mssql.connect(configuration)
    let product= await pool.request().query(`SELECT * FROM ProductTable  WHERE id='${id}'`)
    if(!product.recordset[0]){
        return res.json({message: 'Unallowed to Delete'})
    }
    await pool.request()
    .input('id' ,mssql.VarChar , id)
    .execute('deleteProduct')
    res.json({message: 'Product Successfully Deleted!!!!'})
 } catch (error:any) {
     return res.json({message:error})
 }
}

