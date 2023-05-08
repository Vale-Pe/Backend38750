import messageModel from "../dao/mongo/models/message.model.js";

const socketChat = async (io) => {
    let messages = [];

    io.on('connection', socket => {
        console.log('Nuevo cliente conectado')
        socket.on("message", data =>{
            const newMessage = {email: data.email, content: data.message, createdAt: data.createdAt}
            messages.push(newMessage)
            messageModel.create(newMessage)
            io.emit('messageLogs', messages);
        })

        socket.on('authenticated', data => {
            socket.broadcast.emit('newUserConnected', data)
        })
    })
}

export default socketChat