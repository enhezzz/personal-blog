const express = require('express');
const router = express.Router();
const postModel = require('../model/post');
const {Readable} = require('stream');
const moment = require('moment');
router.get('/homePost',(req,res)=>{
    let pageIndex = req.query.index || 0;
    postModel.find().limit(10).skip(pageIndex*10).select('author title tags views updateDate content')
        .sort('-updateDate').exec((err,posts)=>{
            if(err) throw err;
        // console.log(posts)
        let p = [];
        posts.forEach(post=>{
            let readable = new Readable();
            readable.setEncoding('utf8');
            readable.push(post.content);
            readable.push(null);
            let overview = readable.read(288);
            post.content = overview;
            let r = {};
            r._id = post._id;
            r.tags = post.tags;
            r.views = post.views;
            r.title = post.title;
            r.author = post.author;
            r.content = post.content;
            r.updateDate = moment(post.updateDate).fromNow();
            p.push(r);
        })
        res.json(p).end();
    })
})
router.get('/post',(req,res)=>{
    let postId = req.query.id;
    postModel.findOneAndUpdate({_id: postId},{$inc: {views: 1}},{new: true},(err,post)=>{
        // post.createDate = moment(post.createDate).format('GGGG/HH/mm');
        // post.updateDate = moment(post.updateDate).fromNow();
        // let obj = Object.assign({},post,{
        //     createDate: moment(post.createDate).format('GGGG/HH/mm'),
        //     updateDate: moment(post.updateDate).fromNow()
        // })
        let r = {};
        r.createDate = moment(post.createDate).format('GGGG/HH/mm');
        r.updateDate = moment(post.updateDate).fromNow();
        r._id = post._id;
        r.tags = post.tags;
        r.views = post.views;
        r.title = post.title;
        r.author = post.author;
        r.content = post.content;
        res.json(r).end()
    })
})
const tagModel = require('../model/tags')
router.get('/blogList',(req,res)=>{
    tagModel.find((err,tags)=>{
        if(err) throw err;
        res.json(tags).end();
    })
})
router.get('/blog/:theme',(req,res)=>{
    let theme = decodeURIComponent(req.params.theme);
    let pageIndex = req.query.index || 0;
    postModel.find({tags: theme}).limit(10).skip(pageIndex*10).select('author title tags views updateDate content')
        .sort('-updateDate').exec((err,posts)=>{
        if(err) throw err;
        // console.log(posts)
        let p = [];
        posts.forEach(post=>{
            let readable = new Readable();
            readable.setEncoding('utf8');
            readable.push(post.content);
            readable.push(null);
            let overview = readable.read(288);
            post.content = overview;
            let r = {};
            r._id = post._id;
            r.tags = post.tags;
            r.views = post.views;
            r.title = post.title;
            r.author = post.author;
            r.content = post.content;
            r.updateDate = moment(post.updateDate).fromNow();
            p.push(r);
        })
        res.json(p).end();
    })
})
router.get('/search',(req,res)=>{
    let keyword = req.query.keyword;
    let regExp = new RegExp(keyword,'i');
    postModel.find({"$or": [{tags: regExp},{title: regExp},{author: regExp},{content: regExp}]})
        .sort('-updateDate').exec((err,posts)=>{
            if(err) throw err;
        let p = [];
        posts.forEach(post=>{
            let readable = new Readable();
            readable.setEncoding('utf8');
            readable.push(post.content);
            readable.push(null);
            let overview = readable.read(288);
            post.content = overview;
            let r = {};
            r._id = post._id;
            r.tags = post.tags;
            r.views = post.views;
            r.title = post.title;
            r.author = post.author;
            r.content = post.content;
            r.updateDate = moment(post.updateDate).fromNow();
            p.push(r);
        })
        res.json(p).end();
    })
})
module.exports = router;