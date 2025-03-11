const mongoose = require('mongoose')
const ConnectionString = "mongodb+srv://praful:praful@cluster0.41xzk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
async function connectToDatabase () {
    await mongoose.connect(ConnectionString)
    console.log("Connected TO DB Successfully")
 }

 module.exports = connectToDatabase
 