import fs from 'fs'

let products = []

class ProductManager {
    constructor(path) {  
        this.products = products
        this.path = path
    }

    getProducts = async() => {
        try{
            const contenido = await fs.promises.readFile(this.path, 'utf-8')
            this.products = JSON.parse(contenido)
            return this.products
        }catch(error) {           
            return 'Aún no hay productos agregados'
        }
    }

    addProduct = async(newProduct) => {
        try{
            if (!newProduct.title || !newProduct.description || !newProduct.price || !newProduct.thumbnail || !newProduct.code || !newProduct.stock || !newProduct.status || !newProduct.category) return 'todos los campos son necesarios'

            let product = this.products.find(prod => prod.code === newProduct.code)
            if (product) return 'Ya existe un producto con el código ingresado'

            if (this.products.length === 0) {
            return this.products.push({id: 1, ...newProduct})
            }else{
                this.products.push({id: this.products[this.products.length-1].id + 1 , ...newProduct})
            }
            await fs.promises.writeFile(this.path, JSON.stringify(this.products,'utf-8','\t'))
            return 'Producto cargado exitosamente'   
        }catch (error){
            return(error)
        }
    }

    getProductById = async(pid) => {
        const contenido = await fs.promises.readFile(this.path, 'utf-8')
        let product = JSON.parse(contenido)
        let productById = product.find(prod => prod.id === pid)
        if(!product) return 'El producto no existe'
        return productById
    }

    updateProduct = async(id, updatedProduct) => {
        try{
            let product = this.products.find(prod => prod.id === id)
            if (!product) return 'Not found'
            product.title = updatedProduct.title
            product.description = updatedProduct.description
            product.price = updatedProduct.price
            product.thumbnail = updatedProduct.thumbnail
            product.stock = updatedProduct.stock
            product.code= updatedProduct.code
            await fs.promises.writeFile(this.path, JSON.stringify(this.products,'utf-8','\t'))
            return 'Producto actualizado correctamente'
        }catch (error){
            return(error)
        }
    }

    deleteProduct  = async (id) => {
        try{
            const productToDelete = this.products.find( product => product.id == id )
            if(productToDelete) {
                this.products = this.products.filter( product => product.id !== id )
                await fs.promises.writeFile(this.path, JSON.stringify(this.products,'utf-8','\t'))
                return 'Producto eliminado'
            }
            else {
                return 'No existe producto con el siguiente id: ' + id
            }
        }catch (error){
            return(error)
        }
    }
}

const product = new ProductManager('./productos.json');

const fileTest = async() => {
    await product.getProducts()

    // Prueba para añadir productos -------------------------

    await product.addProduct({
        title: 'producto 1', 
        description: 'Este es un producto de prueba', 
        price: 200, 
        thumbnail: ['img1.jpg'], 
        stock: 25, 
        code: 'a1',
        status: (true),
        category: "B"
    })

    await product.addProduct({
        title: 'producto 2', 
        description: 'Este es un producto de prueba 2',          
        price: 200, 
        thumbnail: ['img2.jpg'], 
        stock: 200,          
        code: 'b2',
        status: (true),
        category: "B"
    })

    await product.addProduct({
        title: 'producto 3', 
        description: 'Este es un producto de prueba 3', 
        price: 300, 
        thumbnail: ['img3.jpg'], 
        stock: 200, 
        code: 'c3',
        status: (true),
        category: "B"
    })

    await product.addProduct({
        title: 'producto 4', 
        description: 'Este es un producto de prueba 4', 
        price: 300, 
        thumbnail: ['img4.jpg'], 
        stock: 200, 
        code: 'd4',
        status: (true),
        category: "B"
    })

    await product.addProduct({
        title: 'producto 5', 
        description: 'Este es un producto de prueba 5', 
        price: 300, 
        thumbnail: ['img5.jpg'], 
        stock: 200, 
        code: 'e5',
        status: (true),
        category: "B"
    })

    await product.addProduct({
        title: 'producto 6', 
        description: 'Este es un producto de prueba 6', 
        price: 300, 
        thumbnail: ['img6.jpg'], 
        stock: 200, 
        code: 'f6',
        status: (true),
        category: "B"
    })

    await product.addProduct({
        title: 'producto 7', 
        description: 'Este es un producto de prueba 7', 
        price: 300, 
        thumbnail: ['img7.jpg'], 
        stock: 200, 
        code: 'g7',
        status: (true),
        category: "A"
    })

    await product.addProduct({
        title: 'producto 8', 
        description: 'Este es un producto de prueba 8', 
        price: 300, 
        thumbnail: ['img8.jpg'], 
        stock: 200, 
        code: 'h8',
        status: (true),
        category: "A"
    })

    await product.addProduct({
        title: 'producto 9', 
        description: 'Este es un producto de prueba 9', 
        price: 300, 
        thumbnail: ['img9.jpg'], 
        stock: 200, 
        code: 'i9',
        status: (true),
        category: "A"
    })

    await product.addProduct({
        title: 'producto 10', 
        description: 'Este es un producto de prueba 10', 
        price: 300, 
        thumbnail: ['img10.jpg'], 
        stock: 200, 
        code: 'j10',
        status: (true),
        category: "A"
    })

    // console.log(await product.getProducts())


    // Prueba para actualizar productos -------------------------

    // console.log(await product.updateProduct(1, {
    //     title: 'producto modificado', 
    //     description: 'Este es un producto de prueba', 
    //     price: 200, 
    //     thumbnail: 'sin imagen', 
    //     stock: 200, 
    //     code: 'a1'
    // }))


    // Prueba para eliminar productos -------------------------

    // console.log(await product.deleteProduct(2))

    // console.log(await product.getProducts())


    // Prueba para mostrar el producto con el id ingresado -------------------------
    
    // console.table(await product.getProductById(3))

}

fileTest();

export default ProductManager 