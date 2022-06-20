import express from 'express'
import { getProducts, getProductbyID, createProduct, updateProduct, deleteProduct } from '../Controller/todoControler'
const router = express.Router()
router.get('/', getProducts)
router.get('/:id', getProductbyID)
router.post('/create', createProduct)
router.patch('/update/:id', updateProduct)
router.delete('/delete/:id', deleteProduct)

export default router