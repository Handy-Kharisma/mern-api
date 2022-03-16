const express = require('express');
const bodyParser = require('body-parser');
// var bodyParser = require('body-parser')

const app = express();

const productRoutes = require('./src/routes/products');

app.use(bodyParser.json()) //type JSON
// JSON.stringify()

app.use(function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/v1/customer', productRoutes);
// app.use('/v2/customer', anotherRoutes);

app.listen(4000, () => console.log('Application is running'));