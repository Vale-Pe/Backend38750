import { Router } from 'express'

import ProductManager from '../dao/filesystem/ProductManager.js'


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

    //console.log(products)
    //console.log(testProduct.products[1].title)
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

router.get('/chat', (req, res)=>{
    res.render('chat', {
        style: 'style.css'
    })
})

export default router