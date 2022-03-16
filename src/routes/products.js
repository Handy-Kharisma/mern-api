const express = require('express');
const router = express.Router();

const productsController = require('../controllers/products');

router.post('/product', productsController.createProduct);
// CREATE -> POST http://localhost:4000/v1/customer/product
/* router.post('/product', function(req, res, next){
    res.json({name : "Handy Kharisma", email : "handykharisma75@gmail.com"});
    next();
}); */

// READ -> GET http://localhost:4000/v1/customer/products
router.get('/products', productsController.getAllProducts);

// UPDATE
router.put('/product', function(req, res, next){
    res.json({name : "Handy Kharisma", email : "handykharisma75@gmail.com"});
    next();
});

// UPDATE
/* router.patch('/product', function(req, res, next){
    res.json({name : "Handy Kharisma", email : "handykharisma75@gmail.com"});
    next();
}); */

// DELETE
router.delete('/product', function(req, res, next){
    res.json({name : "Handy Kharisma", email : "handykharisma75@gmail.com"});
    next();
});




// BACKUP .USE
/* router.use('/product', function(req, res, next){
    res.json({name : "Handy Kharisma", email : "handykharisma75@gmail.com"});
    next();
}); */

module.exports = router;