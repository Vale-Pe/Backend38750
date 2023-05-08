const socket = io()

//socket.emit('message', 'Hola me estoy comunicando desde un cliente socket' )

// const input  = document.querySelector('text')
const productos = document.getElementById('productos')

socket.on('mostrarProductos', data => { // escucha el evento log mapea el array donde estan los mensajes
    data.products.forEach(product=>{
        productos.innerHTML += `<li><p>Title: ${product.title}</p><p>Description: ${product.description}</p><p>Price: ${product.price}</p><p>Image: ${product.thumbnail}</p><p>Stock: ${product.stock}</p><p>Code: ${product.code}</p><p>Status: ${product.status}</p><p>Category: ${product.category}</p></li>`
    })
})

let userEmail = ''

Swal.fire({
    title: 'Ingresá tu email',
    input: 'email',
    inputPlaceholder: 'email',
    inputValidator: (value) => {
        return !value && 'El e-mail es obligatorio para ingresar al chat'
    },
    allowOutsideClick: false,
    onOpen: (modal) => {
        modal.querySelector('input').focus()
    },
    preConfirm: (value) => {
        if (/\S+@\S+\.\S+/.test(value)) {
            return value.trim()
        } else {
            Swal.showValidationMessage('Please enter a valid email address')
            return false
        }
    }
}).then(result => {
    userEmail = result.value
    socket.emit('authenticated', userEmail)
})


const input  = document.getElementById('text')
const log = document.getElementById('messages')
const date = new Date()

input.addEventListener('keyup',evt=>{
    if(evt.key === "Enter"){
        socket.emit('message', {email: userEmail, message: input.value, createdAt: date})
        input.value= ""
    }
})

socket.on('messageLogs', data =>{
    let log = document.getElementById('messageLogs')
    let logs=''
    data.forEach(log =>{
        logs += `<li class="w-100 bg-gray-200 py-2 px-1 rounded my-2 flex justify-between items-center"><p class="block">${log.email} dice: ${log.content}</p> <span class="block text-sm text-gray-400">${log.createdAt}</span></li>`
    })
    log.innerHTML=logs
})