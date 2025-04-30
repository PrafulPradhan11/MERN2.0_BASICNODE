const express = require('express')
const app = express()
const fs = require('fs')
// const app = require('express')()

const connectToDatabase = require('./database')
const Book = require('./model/bookModel')
//multerconfig imports
const {multer,storage} = require("./middleware/multerConfig")
const upload = multer({storage: storage}) 

//ccors package
const cors = require('cors')

// app.use(cors({
//     origin: '*'
//   }))
  app.use(cors({
    origin: 'https://mern-2-0-lms-react-bice.vercel.app', // your frontend domain
    credentials: true
}));


app.use(express.json())


connectToDatabase();


app.get("/", (req,res)=>{

    res.status(200).json({
        "message" : "Success"
    })
})

//Create Book
app.post("/book",upload.single('image'),async(req,res)=>{
   
    let fileName;
    if(!req.file){
        fileName = "https://cdn.vectorstock.com/i/500p/73/69/anonymous-male-profile-picture-emotion-avatar-vector-15887369.jpg"
    } else {
        fileName = "http://localhost:3000/" + req.file.filename
    }
  const {bookName,bookPrice,isbnNumber,authorName,publishedAt,publication} = req.body
   await  Book.create({
        bookName,
        bookPrice,
        isbnNumber,
        authorName,
        publishedAt,
        publication,
        imageUrl: fileName
    })
    res.status(201).json({
        message : "Book Created Sucessfully"
    })
})


//All read
app.get("/book",async(req,res)=>{
    const books = await Book.find() // return array ma garxa
    res.status(200).json({
        message: "Books fetched successfully",
        data : books
    })
})

//Single read
app.get("/book/:id",async(req,res)=>{
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
    }
})

//Delete operation
// app.get("/deletebook/:id", async (req,res)=>{
app.delete("/book/:id", async (req,res)=>{
    const id = req.params.id
    await Book.findByIdAndDelete(id)
    res.status(200).json({
        message : "Book Deleted Sucessfully"
    })
})

//update opertaion
app.patch("/book/:id",upload.single('image'),async (req,res)=>{
    const id = req.params.id // kun book update garney id ho yo
    const {bookName,bookPrice,authorName,isbnNumber,publishedAt,publication} = req.body
    const oldDatas = await Book.findById(id)
    let fileName;
    if(req.file){

        const oldImagePath = oldDatas.imageUrl
        console.log(oldImagePath)
        const localHostUrlLength = "http://localhost:3000/".length
        const newOldImagePath = oldImagePath.slice(localHostUrlLength)
        console.log(newOldImagePath)
        fs.unlink(`storage/${newOldImagePath}`, (err) => {
            if(err){
                console.log(err)
            } else{
                console.log("File Deleted Successfully")
            }
        })
        fileName = "http://localhost:3000/" + req.file.filename
    }
    await Book.findByIdAndUpdate(id,{
        bookName : bookName,
        bookPrice : bookPrice,
        authorName : authorName,
        isbnNumber : isbnNumber,
        publication: publication,
        publishedAt : publishedAt,
        imageUrl : fileName
    })
    res.status(200).json({
        message : "Book Updated Sucessfully"
    })
})

app.use(express.static("./storage/")) 

 app.listen(3000,() =>{
    console.log("Nodejs server has started at port 3000")
})