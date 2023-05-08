//import ProductManager from "../dao/filesystem/ProductManager"
import productManager from '../dao/mongo/product.mongo.js'

const socketProducts = async (io) => {
    //const productManager = new ProductManager('./productos.json')
    let products = await productManager.getProducts()
    
    io.on('connection', socket => {
        console.log('Nuevo cliente conectado')
    
        io.emit('mostrarProductos',{products}); // se lo manda a todos los clientes con el evento log
    
        socket.on("product2", data => {
            
            products.push({data}) // agrega el mensaje a un array en formato de objeto, con un id
        
            io.emit('mostrarProductos', {products}); // se lo manda a todos los clientes con el evento log
        })
    })
}

export default socketProducts