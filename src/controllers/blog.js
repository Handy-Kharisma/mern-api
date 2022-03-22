const {validationResult} = require('express-validator');
// const { result } = require('lodash');
const path = require('path');
const fs = require('fs');
const BlogPost = require('../models/blog');
// const { count } = require('console');

exports.createBlogPost = (function(req, res, next){
    
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const err = new Error('Input Value Tidak Sesuai');
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

exports.getAllBlogPost = (function(req, res, next){
    const currentPage = req.query.page || 1;
    const perPage = req.query.perPage || 5;
    let totalItems;

    BlogPost.find()
    .countDocuments()
    .then(count => {
        totalItems = count;
        return BlogPost.find()
        .skip((parseInt(currentPage) - 1) * parseInt(perPage))
        .limit(parseInt(perPage));
    })
    .then(result => {
        res.status(200).json({
            message: 'Data Blog Post Berhasil Dipanggil',
            data: result,
            total_data: totalItems,
            per_page: parseInt(perPage),
            current_page: parseInt(currentPage),
        })
    })
    .catch(err =>{
        next(err);
    })

    /* BlogPost.find()
    .then(result => {
        res.status(200).json({
            message: 'Data Blog Post Berhasil Dipanggil',
            data: result,
        })
    })
    .catch(err =>{
        next(err);
    }) */
});

exports.getBlogPostById = (function(req, res, next){
    
    const postId = req.params.postId;
   
    BlogPost.findById(postId)
    .then(result => {
        if(!result){
            const error = new Error('Blog Post Tidak Ditemukan');
            error.errorStatus = 404;
            throw error;
        }
        res.status(200).json({
            message: 'Data Blog Post Berhasil Dipanggil',
            data: result,
        })
    })
    .catch(err =>{
        next(err);
    })
});

exports.updateBlogPost = (function(req, res, next){

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const err = new Error('Input Value Tidak Sesuai');
        err.errorStatus = 400;
        err.data = errors.array();
        throw err;
    };

    if(!req.file){
        const err = new Error('Image Harus Di Upload');
        err.errorStatus = 422;
        // err.data = errors.array();
        throw err;
    }

    const title = req.body.title;
    const image = req.file.path;
    const body = req.body.body;
    const postId = req.params.postId;

    BlogPost.findById(postId)
    .then(post => {
        if(!post){
            const error = new Error('Blog Post Tidak dDtemukan');
            error.errorStatus = 404;
            throw error;
        }
        post.title = title;
        post.image = image;
        post.body = body;

        return post.save();
    })
    .then(result => {
        res.status(200).json({
            message: 'Update Success',
            data: result,
        })
    })
    .catch(err =>{
        next(err);
    })
});

exports.deleteBlogPost = (function(req, res, next){
    
    const postId = req.params.postId;

    BlogPost.findById(postId)
    .then(post => {
        if(!post){
            const error = new Error('Blog Post Tidak Ditemukan');
            error.errorStatus = 404;
            throw error;
        }
        removeImage(post.image);
        return BlogPost.findByIdAndRemove(postId);
        
    })
    .then(result => {
        res.status(200).json({
            message: 'Delete Success',
            data: result,
        })
    })
    .catch(err =>{
        next(err);
    })
});

const removeImage = (function(filePath){
    console.log('filePath', filePath);
    console.log('dir name: ', __dirname);

    filePath = path.join(__dirname, '../..', filePath)
    fs.unlink(filePath, err => console.log(err));
});