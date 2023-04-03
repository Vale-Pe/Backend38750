//El servidor debe contar con los siguientes endpoints:
//ruta ‘/products’, la cual debe leer el archivo de productos y devolverlos dentro de un objeto. Agregar el soporte para recibir por query param el valor ?limit= el cual recibirá un límite de resultados.
//Si no se recibe query de límite, se devolverán todos los productos
//Si se recibe un límite, sólo devolver el número de productos solicitados
//ruta ‘/products/:pid’, la cual debe recibir por req.params el pid (product Id), y devolver sólo el producto solicitado, en lugar de todos los productos. 

import express from 'express'
import ProductManager from "./ProductManager.js";

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const manager = new ProductManager('./productos.json');

app.get('/', async (request, response)=>{
    response.send('<h1 style="color: grey;">Bienvenid@s!</h1>')
})

app.get('/products', async (request, response)=>{

    try{
        const { limit } = request.query
        const products = await manager.getProducts()
        if(!limit || limit >= products.length) {    
            return response.send({
                status: 'success',
                products
            }) 
        }
        
        return response.send({
            status: 'success',
            products: products.slice(0, limit)
        }) 
    } catch (error) {
        console.log(error)
    }
})

app.get('/products/:pid', async (request, response) => {
    try {
        const { pid } = request.params
        //console.log(pid)
        const productById = await manager.getProductById(parseInt(pid))
        //console.log(productById)
        if (!productById) {
            return response.send({
                status: 'error', 
                error: 'producto no encontrado'
            })
        }

        return response.send({
            status: 'success',
            productById
        }) 
    } catch (error) {
        console.log(error);
    }
})

app.listen(8080, ()=>{ // aca escucha el servidor
    console.log('Escuchando en el puerto 8080')
})