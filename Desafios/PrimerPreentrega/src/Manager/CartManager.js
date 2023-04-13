import fs from 'fs'
import ProductManager from './ProductManager.js'

const productManager = new ProductManager('./productos.json')

let carts = []

class CartManager {
    constructor(path) {  
        this.carts = carts
        this.path = path
    }
    
    getCarts = async() => {
        try{
            const contenido = await fs.promises.readFile(this.path, 'utf-8')
            this.carts = JSON.parse(contenido)
            return this.carts
        }catch(error) {           
            return 'Aún no hay carritos agregados'
        }
    }

    saveCarts = async () => {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(this.carts,'utf-8','\t'))
        } catch (error){
            return error
        }
    }

    createCart = async () => {
        try {
            await this.getCarts()
            this.carts.push({
                id: this.carts.length + 1,
                products: []
            })

            await this.saveCarts()
        } catch (error){
            return error
        }
    }

    getCartById = async(cid) => {
        try{
            const contenido = await fs.promises.readFile(this.path, 'utf-8')
            let cart = JSON.parse(contenido)
            let cartById = cart.find(cart => cart.id == Number(cid))
            if(!cart) return 'El carrito no existe'
            return cartById
        }catch(error) {           
            return error
        }
    }

    productExists = async (pid) => {
        try{
            const contenido = await fs.promises.readFile("./productos.json", 'utf-8');
            let products = JSON.parse(contenido)
            let productById = products.find(product => product.id === Number(pid))

            if(!productById) return 'No existen productos con el siguiente id: ' + pid

            return productById
        }catch(error) {           
            return error
        }
    }

    addProductToCart = async (cid, pid) => { 
        try {
            const productToAdd = await this.productExists(Number(pid))

            let carts = await this.getCarts()
            let cart = carts.find(cart => cart.id === Number(cid))

            if (!cart) {
                return "No existen carritos con el siguiente id: " + cid
            } else {
                const index = cart.products.findIndex(product => product.id == Number(pid))

                if(index === -1){
                    cart.products.push({
                        id: productToAdd.id,
                        quantity: 1
                    })
                    await this.saveCarts()
                } else {
                    cart.products[index] = ({
                        id: cart.products[index].id, 
                        quantity: Number(cart.products[index].quantity) + 1 
                    })
                    await this.saveCarts()
                }
            }

        } catch (error) {
            return error
        }
    }
}

const cart = new CartManager('./carrito.json');

const fileTest = async() => {
//     console.log(await cart.getCarts())

//     console.Vlog(await cart.createCart())

//     await cart.addProductToCart(1,5)
//     await cart.productExists()

}


fileTest()

export default CartManager 