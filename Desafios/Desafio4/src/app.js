import express from 'express'
import cookieParser from 'cookie-parser'
//----- para poder usar __dirname en Node.js con ES modules
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
//----------------------------------------------
import ProductManager from './Manager/ProductManager.js';
import productRouter from './routes/products.router.js'
import cartRouter from './routes/carts.router.js'
import viewsRouter from './routes/views.router.js'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'

const app = express()
const PORT = 8080

const httpServer = app.listen(PORT,()=>{
    console.log(`Escuchando en el puerto: ${PORT}`)
}) 

const io = new Server(httpServer) //instancia de nuestro socket (SERVIDOR)

// hbs

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')

// hbs 

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/static', express.static(__dirname+'/public'))

app.use(cookieParser())

app.use('/', viewsRouter)
app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)

app.get('/realtimeproducts', (req, res)=>{
    res.render('realtimeproducts', {})
})

const productManager = new ProductManager('./productos.json')
let products = await productManager.getProducts()

io.on('connection', socket => {
    console.log('Nuevo cliente conectado')

    io.emit('mostrarProductos',{products}); // se lo manda a todos los clientes con el evento log

    socket.on("product2", data => {
        
        products.push({data}) // agrega el mensaje a un array en formato de objeto, con un id

        io.emit('mostrarProductos', {products}); // se lo manda a todos los clientes con el evento log
    })
})

app.use((err, req, res, next)=>{
    console.log(err)
    res.status(500).send('Todo mal')
})