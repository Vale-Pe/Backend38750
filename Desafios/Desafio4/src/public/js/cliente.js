const socket = io()

socket.emit('message', 'Hola me estoy comunicando desde un cliente socket' )

// const input  = document.querySelector('text')
const productos = document.getElementById('productos')

// input.addEventListener('keyup',evt=>{ //keyup cuando leventamos 
//     if(evt.key==="Enter"){
//         socket.emit('product2',input.value)
//         input.value="" //vuelve a 0 para que borre todo lo que escribimos
//     }
// })

socket.on('mostrarProductos', data => { // escucha el evento log mapea el array donde estan los mensajes
    
    //console.log(data.products)
    data.products.forEach(product=>{
        productos.innerHTML += `<li><p>Title: ${product.title}</p><p>Description: ${product.description}</p><p>Price: ${product.price}</p><p>Image: ${product.thumbnail}</p><p>Stock: ${product.stock}</p><p>Code: ${product.code}</p><p>Status: ${product.status}</p><p>Category: ${product.category}</p></li>`
    })
})