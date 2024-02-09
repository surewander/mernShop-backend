const express = require('express');
const path = require('path');

const mongoose = require('mongoose');

//const database = require('./database');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./Routes/userRoutes')
const productRoutes = require('./Routes/productRoutes')
const cartRoutes = require('./Routes/cartRoutes')
const multer = require('multer');
const { isAuth } = require('./Middlewares/authMiddlewares');


require('dotenv').config(); // Load environment variables
process.env.port

const app = express();

const staticPath = path.join(__dirname, 'public');
app.use(express.static(staticPath));

//const destPath = path.join('public','Images')

const fs = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,path.join('public','Images'))
    },
    filename: (req, file, cb) => {
        let name = 'img' + '-' + Math.random()
        req.body.fileName = name;
        cb(null,name)
    }
})
app.use(cors());
app.use(multer({
    storage: fs
}).single('image'))


app.use(bodyParser.json());

app.use(userRoutes)
app.use(productRoutes);

app.use(cartRoutes);





mongoose.connect("mongodb+srv://milanbhalla1999:27LxYkZQjhZr2Iwk@mernshop.m6si84p.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then((conn) => {
        //myConnection = conn   
        console.log('Connected to MongoDB Atlas')
        app.listen(8080);
    }
    )
    .catch(err => console.error('Error connecting', err));
