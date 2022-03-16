const {validationResult} = require('express-validator');

exports.createBlogPost = (function(req, res, next){
    const title = req.body.title;
    // const image = req.body.image;
    const body = req.body.body;

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const err = new Error('Input value tidak sesuai');
        err.errorStatus = 400;
        err.data = errors.array() ;
        throw err;
    }

    /* if(!errors.isEmpty()){
        console.log('err : ', errors)
        res.status(400).json({
            message: 'Request Error',
            data: null,
        })
    } */
        
    const result = {
        message: 'Create Blog Post Success',
        data: {
            post_id : 1,
            title : title,
            image : "imagefile.png",
            body : body,
            create_at : "12/06/2022",
            author : {
                uid : 1,
                name : "Handy"
            }
        }
    }

    // console.log('request: ', req.body);
    
    res.status(201).json(result);

    next();
    
});