const express = require('express')
const app = express()
// const app = require('express')()

const connectToDatabase = require('./database')
const Book =require('./model/bookModel')


app.use(express.json())
 connectToDatabase();



app.get("/", (req,res)=>{

    res.status(200).json({
        "message" : "Success"
    })
})
app.post("/book",async(req,res)=>{
    const {bookName,bookPrice,isbnNumber,authorName,publishedAt,publication} = req.body
   await  Book.create({
        bookName,
        bookPrice,
        isbnNumber,
        authorName,
        publishedAt,
        publication
    })
    res.status(201).json({
        message : "Book Created Sucessfully"
    })
})


app.get("/book",async(req,res)=>{
    const books = await Book.find() // return array ma garxa
    console.log(books)
    res.status(200).json({
        message: "Books fetched successfully",
        data : books
    })
})

//Single read
app.get("/book/:id",async(req,res)=>{
    try{
        const id = req.params.id
        const book = await Book.findById(id)  //return object garxa
        if(!book){
            res.status(404).json({
                message : "Nothong found"
            })
        } else{
            res.status(200).json({
                message: "Single Book Ferched Successfully",
                data : book
            })
        }} catch (error){
            res.status(500).json({
                message : "Something went wrong"
            })
        }
})




 app.listen(3000,() =>{
    console.log("Nodejs server has started at port 3000")
})

