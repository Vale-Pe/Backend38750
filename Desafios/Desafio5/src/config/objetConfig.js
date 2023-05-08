import mongoose from 'mongoose'

let url = "mongodb+srv://valeperone:coderhouse@cluster0.pa8dn8w.mongodb.net/"

export default {
    connectDB: () => {
        mongoose.connect(url)
        console.log("Connected to the DB");
    }
}