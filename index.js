const express = require('express');
const app = express();

const productRoutes = require('./src/routes/products');

app.use('/v1/customer', productRoutes);
// app.use('/v2/customer', anotherRoutes);

app.listen(4000, () => console.log('Application is running'));