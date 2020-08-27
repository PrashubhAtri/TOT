const express = require('express')
const path = require('path')

const connectDB = require('./data/db')

const apiRoute = require('./routes/api').route

const app = express()

connectDB()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api', apiRoute)

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

const PORT = process.env.PORT || 5678

app.listen(PORT,()=>{
    console.log(`started at http://localhost:${PORT}`)
})


// https://youtu.be/Gjk25N7WFkI