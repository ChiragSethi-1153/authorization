const express = require('express')
const mongoose = require('mongoose')
const router = require('./Routes/userRoutes');
const cookieParser = require('cookie-parser')

const cors = require('cors');

const app = express();
app.use(cookieParser())
app.use(cors())
app.use(express.json({extended: true}))
app.use(express.urlencoded({extended:true}))
app.use('/api', router)
app.use(express.json())


mongoose.connect('mongodb+srv://chirag1153:r2qDFoTSexIs6JNX@cluster0.slkp5ui.mongodb.net/').then(() => {
    app.listen(5000);
    console.log('db is connected')
}).catch((err) => console.log(err))




























// r2qDFoTSexIs6JNX

