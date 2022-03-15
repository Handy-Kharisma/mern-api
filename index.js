const express = require('express');
const app = express();
const router = express.Router();

router.use('/product', function(req, res, next){
    // console.log('request: ', req);
    // console.log('url: ', req.originalUrl);
    // console.log('method: ', req.method);
    res.json({name : "Handy Kharisma", email : "handykharisma75@gmail.com"});
    next();
    // res.send("Hello from the root application URL");
});

router.use('/price', function(req, res, next){
    res.json({price : "3000000"});
    next();
});

router.get('/customers', function(req, res, next){
    res.json({title : "Customer"});
    next();
});

// router.delete('/customers', function(req, res, next){
//     res.json({title : "Customer"});
//     next();
// });

// app.get('/', function(req, res, next){
//     res.send("Hello from the root application URL");
// });

app.use('/', router);

app.listen(4000);

// , () => console.log('Application is running')