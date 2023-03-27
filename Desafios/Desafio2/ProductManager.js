const fs = require('fs')

class ProductManager {
    constructor(path){
        this.path = path
        this.products = []

        try {
            if(fs.existsSync(this.path)) {
                const jsonFile = fs.readFileSync(this.path, 'utf-8');
                const data = JSON.parse(jsonFile)
                this.products = data
            }else {
                fs.writeFileSync(this.path, JSON.stringify(this.products))
            }
        } catch(err) { 
            console.log("An error has occurred: " + err )
            return "An error has occurred: " + err 
        }
    }

    addProduct(product) {
        const isRepeated = this.products.some((productSaved) => productSaved.code == product.code)

        if(isRepeated == false && product.title && product.description && product.price && product.thumbnail && product.code && product.stock) {
            this.products.push({
                id: this.products[this.products.length-1].id + 1,
                title: product.title,
                description: product.description,
                price: product.price,
                thumbnail: product.thumbnail,
                code: product.code,
                stock: product.stock
            })

            const jsonData = JSON.stringify(this.products)
            fs.writeFileSync(this.path, jsonData)

            return "Product added successfully"
        }else { 
            return "Duplicate product code or missing add some features" 
        }
    }

    getProducts() {
        return this.products
    }

    getProductById(id) {
        const productById = this.products.find((product) => product.id == id)
        if(productById) { 
            return productById 
        }else { 
            return "There is no product with the id: " + id 
        }
    }

    updateProduct(id, updatedProduct) {
        const productToUpdate = this.products.find( product => product.id == id )
        if(productToUpdate) {
            const isRepeated = this.products.some((productSaved) => productSaved.code == updatedProduct.code) // check if the product code already exists
            if(isRepeated == false) {
                this.products[id - 1] = {
                    ...this.products[id - 1], // previous values
                    ...updatedProduct // new values
                }

                const jsonData = JSON.stringify(this.products)
                fs.writeFileSync(this.path, jsonData)
                return "Product updated successfully"
            }else {
                return "There is already a product with the code: " + updatedProduct.code
            }
        }else {
            return "There is no product with the id: " + id
        }
    }

    deleteProduct(id) {
        const productToDelete = this.products.find( product => product.id == id )
        if(productToDelete) {
            this.products = this.products.filter( product => product.id !== id )
            const jsonData = JSON.stringify(this.products)
            fs.writeFileSync(this.path, jsonData)
            return "Product deleted successfully"
        }else {
            return "There is no product with the id: " + id
        }
    }
}