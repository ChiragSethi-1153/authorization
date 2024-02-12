require("dotenv").config();

const express = require('express')
require('./config/db');
const router = require('./routes');
const cookieParser = require('cookie-parser')

const cors = require('cors');

const app = express();
app.use(cookieParser())
app.use(cors({credentials: true, origin: "http://localhost:3000"}))
app.use(express.json({extended: true}))
app.use(express.urlencoded({extended:true}))
app.use('/', router)
app.use(express.json())


app.listen(process.env.PORT, function(){
    console.log(`Server listening on port ${process.env.PORT}`)
})


























// r2qDFoTSexIs6JNX

