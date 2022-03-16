const express = require('express');
const bodyParser = require('body-parser');
// var bodyParser = require('body-parser')

const app = express();

// const productRoutes = require('./src/routes/products');
const authRoutes = require('./src/routes/auth');
const blogRoutes = require('./src/routes/blog');


app.use(bodyParser.json()) //type JSON
// JSON.stringify()

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

app.listen(4000, () => console.log('Application is running'));