import mongoose from 'mongoose'

const collection = 'messages'

const messageSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const messageModel = mongoose.model(collection, messageSchema)

export default messageModel