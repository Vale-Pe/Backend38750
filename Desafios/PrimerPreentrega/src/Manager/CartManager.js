import fs from 'fs'

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
            //console.log(await fs.promises.readFile("./productos.json", 'utf-8'))
            let product = JSON.parse(contenido)
            //console.log(product)
            let productById = product.find(prod => prod.id === pid)
            //console.log(productById)
    
            if(!productById) return 'No existen productos con el siguiente id: ' + pid
        }catch(error) {           
            return error
        }
    }

    
    addProductToCart = async (cid, pid) => { 
        try {
            console.log(await this.productExists(pid))
            await this.productExists(pid)

            await this.getCarts()
            const cart = await this.getCartById(cid)
            const index = cart.products.findIndex(product => product.id == pid)

            if(index === -1){
                cart.products.push({
                    id: pid,
                    quantity: 1
                })
                this.saveCarts()
            } else {
                cart.products[index] = ({
                    ...cart.products[index], 
                    quantity: Number(cart.products[index].quantity) + 1 
                })
                this.saveCarts()
            }
        } catch (error) {
            return error
        }
    }
}

const cart = new CartManager('./carrito.json');

const fileTest = async() => {
//     console.log(await cart.getCarts())

//     console.log(await cart.createCart())
}


fileTest()

export default CartManager 