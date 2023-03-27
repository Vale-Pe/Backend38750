let products = []

// title, description, price, thumbnail, code, stock

class ProductManager {
    constructor() {  
        this.products = products
    }

    addProduct(newProduct){
        if (!newProduct.title || !newProduct.description || !newProduct.price || !newProduct.thumbnail || !newProduct.code || !newProduct.stock) return 'todos los campos son necesarios'

        let product = this.products.find(prod => prod.code === newProduct.code)
        if (product) return 'Ya existe un producto con el código ingresado'

        if (this.products.length === 0) {
            return this.products.push({id: 1, ...newProduct})
        } 

        return [ this.products.push({id: this.products[this.products.length-1].id + 1 , ...newProduct})]
    }

    getProduct(){
        return this.products
    }

    getProductById(id){
        let product = this.products.find(prod => prod.id === id)
        if (!product) return 'Error: Not Found'
        return product
    }
}

const product = new ProductManager()

product.addProduct({title: 'Remera', description: 'manga corta, 100% algodón', price: 2500, thumbnail: 'link', code: 001, stock: 10})
product.addProduct({title: 'Pantalon', description: 'wide leg', price: 10000, thumbnail: 'link', code: 002, stock: 5})
product.addProduct({title: 'Buzo', description: 'algodón con capucha', price: 13500, thumbnail: 'link', code: 003, stock: 8})
console.log(product.getProduct())
console.log(product.getProductById(1))

