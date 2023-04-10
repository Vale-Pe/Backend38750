//Id:Number/String (A tu elección, de igual manera como con los productos, debes asegurar que nunca se dupliquen los ids y que este se autogenere). products: Array que contendrá objetos que representen cada producto


import { Router } from 'express'
import CartManager from '../Manager/CartManager.js'

const router = Router()

const cartManager = new CartManager('./carrito.json')

let carts = await cartManager.getCarts()

router.post('/', async (req, res)=>{
    try{
        await cartManager.createCart()
        res.status(200).send({status: 'succes', message: 'Carrito creado correctamente'})
    }catch(error){
        res.status(400).send({status: 'error', message: error.message})
    }
})

router.get('/:cid', async (req, res) => {
    try {
        const { cid } = req.params
        const cartById = await cartManager.getCartById(Number(cid))

        if (!cartById) {
            return res.status(400).send({status:'error', message: 'carrito no encontrado'})
        }

        return res.status(200).send({cartById}) 

    } catch (error) {
        res.status(400).send({status: 'error', message: error.message})
    }
})

router.post('/:cid/product/:pid ', async (req, res)=>{
    try{
        const { cid } = req.params
        const { pid } = req.params

        await cartManager.addProductToCart(cid, pid)
        res.status(200).send({status: 'succes', payload: carts})
    }catch (error){
        res.status(400).send({status: 'error', message: 'error'})
    }





    // await cartManager.addCart()

    // res.status(200).send({carts})
})

export default router
