import { Router } from 'express'
import ProductManager from '../Manager/ProductManager.js'

const router = Router()
const productManager = new ProductManager('./productos.json')

//console.log(await productManager.getProducts())

let products = await productManager.getProducts()


router.get('/', async (req, res)=>{

    try{
        const { limit } = req.query
        //const products = await productManager.getProducts()
        if(!limit || limit >= products.length) {    
            return res.status(200).send({products}) 
        }
        
        return res.status(200).send({products: products.slice(0, limit)}) 
    } catch (error) {
        console.log(error)
    }
})

router.get('/:pid', async (req, res) => {
    try {
        const { pid } = req.params
        //console.log(pid)
        const productById = await productManager.getProductById(Number(pid))
        //console.log(productById)
        if (!productById) {
            return res.status(404).send({status:'error', message: 'producto no encontrado'})
        }

        return res.status(200).send({productById}) 
    } catch (error) {
        console.log(error);
    }
})

router.post('/', async (req, res)=>{
    let product = req.body

    if(!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock || !product.status || !product.category){ 
        return res.status(400).send({status:'error', message: 'todos los campos son necesarios'})
    }

    await productManager.addProduct(product)

    res.status(200).send({products})
})

router.put('/:pid', async (req, res) => {
    const { pid } = req.params
    //console.log(pid)
    let product = req.body

    if(!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock || !product.status || !product.category){ 
        return res.status(400).send({status:'error', message: 'todos los campos son necesarios'})
    }
    
    const index = products.findIndex(product => product.id === Number(pid))
    //console.log(index)  
    //validar que exista
    if(index === -1) res.status(400).send({status: 'error', message: 'No existe el producto'})

    products[index] = {id: pid, ...product}
    //console.log(products[index])
    //console.log(products)
    let updatedProduct = products[index]

    await productManager.updateProduct(Number(pid), updatedProduct)

    res.status(200).send({ products })
})


router.delete('/:pid', async (req, res) => { //--> Elimina en Postman pero no del .json
    let { pid } = req.params
    // buscar por pid user
    const index = products.findIndex(product => product.id === Number(pid))   

    const productoEliminado = products[index] 
    //validar que exista
    if(index === -1) res.status(400).send({status: 'error', message: 'No existe el producto'})

    //

    //console.log(index)
    //const productoEliminado = products[index]

    //console.log(productoEliminado.id)
    

    await productManager.deleteProduct(productoEliminado.id)

    products = products.filter(prod => prod.id !== Number(pid))

    res.status(200).send({status: 'success', payload: products})
})

export default router