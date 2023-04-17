import { Router } from 'express'
import ProductManager from '../Manager/ProductManager.js'

const router = Router()
const productManager = new ProductManager('./productos.json')

let products = await productManager.getProducts()
//console.log(products)

router.get('/', (req, res)=>{

    let testProduct = {
        title: 'Coderhouse',
        products,
        style: 'style.css'
    }

    res.render('home', testProduct)
})

router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', {
        style: 'style.css'
    })
})

// router.post('/realtimeproducts', (req, res) => {
//     const product = req.body
//     res.send({
//         product,
//         mensaje: 'Producto agregado con éxito'
//     })
// })

export default router