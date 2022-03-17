const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
// var bodyParser = require('body-parser')

const app = express();
const authRoutes = require('./src/routes/auth');
const blogRoutes = require('./src/routes/blog');
// const productRoutes = require('./src/routes/products');

const fileStorage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'images');
    },
    filename: function(req, file, cb){
        cb(null, new Date().toString() + '-' + file.originalname)
    }
})

const fileFilter = function(req, file, cb){
    if( file.mimetype === 'image/png' || 
        file.mimetype === 'image/jpg' || 
        file.mimetype === 'image/jpeg'){
        cb(null, true);
    } else {
        cb(null, false);
    }
}

app.use(bodyParser.json()) //type JSON
app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image'))

app.use(function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// app.use('/v1/customer', productRoutes);
// app.use('/v2/customer', anotherRoutes);
app.use('/v1/auth', authRoutes);
app.use('/v1/blog', blogRoutes);

app.use(function(error, req, res, next){
    const status = error.errorStatus || 500;
    const message = error.message;
    const data = error.data;

    res.status(status).json({message: message, data: data});
});

mongoose.connect('mongodb+srv://Handy_Kharisma:KharismaDS75@cluster0.zsenz.mongodb.net/BlogDatabase?retryWrites=true&w=majority')
.then(function(error, req, res, next){
    app.listen(4000, () => console.log('Connection Success, Application is Running'));
})
.catch(err => console.log(err));