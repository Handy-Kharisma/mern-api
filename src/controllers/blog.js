const {validationResult} = require('express-validator');
const BlogPost = require('../models/blog');

exports.createBlogPost = (function(req, res, next){
    
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const err = new Error('Input value tidak sesuai');
        err.errorStatus = 400;
        err.data = errors.array();
        throw err;
    };

    if(!req.file){
        const err = new Error('Image Harus di Upload');
        err.errorStatus = 422;
        // err.data = errors.array();
        throw err;
    }

    const title = req.body.title;
    const image = req.file.path;
    const body = req.body.body;

    const Posting = new BlogPost({
        title: title,
        image: image,
        body: body,
        author: {
            uid: 1,
            name: "Handy Kharisma",
        }
    });

    Posting.save()
    .then(result => {
        return res.status(201).json({
            message: 'Create Blog Post Success',
            data: result,
                /* {
                post_id : 1,
                title : title,
                image : "imagefile.png",
                body : body,
                create_at : "12/06/2022",
                author : {
                    uid : 1,
                    name : "Handy"
                } */
        }); 
    })
    .catch(err => {
        console.log('err: ', err);
    });
    
    /* if(!errors.isEmpty()){
        console.log('err : ', errors)
        res.status(400).json({
            message: 'Request Error',
            data: null,
        })
    } */
    
    // console.log('request: ', req.body);
    
    // next();
    
});