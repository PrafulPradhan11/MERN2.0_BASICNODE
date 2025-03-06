const express = require('express')
const app = express()
 
 //Alrenative 
 // const app = require('express')()



app.get("/", (req,res)=>{
    res.send("Hello World")
})









 app.listen(3000,() =>{
    console.log("Nodejs server has started at port 3000")
})

