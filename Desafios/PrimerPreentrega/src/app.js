import express from 'express'
import cookieParser from 'cookie-parser'

//----- para poder usar __dirname en Node.js con ES modules
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
//----------------------------------------------

import productRouter from './routes/products.router.js'
import cartRouter from './routes/carts.router.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/static', express.static(__dirname+'/public'))

app.use(cookieParser())

app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)

app.use((err, req, res, next)=>{
    console.log(err)
    res.status(500).send('Todo mal')
})

const PORT = 8080

app.listen(PORT, ()=>{ // aca escucha el servidor
    console.log(`Escuchando en el puerto ${PORT}`)
})