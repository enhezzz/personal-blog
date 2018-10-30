const express = require('express');
const router = express.Router();
const path = require('path');
const formidable = require('formidable');
const qiniu = require('qiniu');
const uuidv1 = require('uuid/v1');
const fs = require('fs');
var accessKey = 'ysHQtCvVpCeV9N5U0Za8cXXNq7Opqrbfssw2M812';
var secretKey = 'B9Bq9a-7d--iJFevKwTDnrMlUsgM2ZtPpkvMluyy';
var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
var options = {
    scope: 'blog',
    returnBody: '{"key":"$(key)","hash":"$(etag)","name":"$(fname)","bucket":"$(bucket)","bucket":"$(bucket)"}',
  };
  var putPolicy = new qiniu.rs.PutPolicy(options);
  var uploadToken=putPolicy.uploadToken(mac);
  var config = new qiniu.conf.Config();
// 空间对应的机房
config.zone = qiniu.zone.Zone_z2;
router.post('/upload',(req,res)=>{
    let form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = path.resolve(__dirname,'../upload');
    form.keepExtensions = true;
    form.parse(req, function(err, fields, files) {
    //  console.log(files);
     let data = [];
     Object.keys(files).forEach( async (fileName,index,arr)=>{
        const filePath = files[fileName]['path'];
        const key = uuidv1() + encodeURIComponent(files[fileName]['name']);
        // console.log(filePath);
        var localFile = filePath;
        var formUploader = new qiniu.form_up.FormUploader(config);
        var putExtra = new qiniu.form_up.PutExtra();
       //  var key='test.jpg';
        // 文件上传
        // console.log(arr)
        await new Promise((resolve,reject)=>{
            formUploader.putFile(uploadToken, key, localFile, putExtra, function(respErr,
                respBody, respInfo) {
                if (respErr) {
                    reject(respErr); 
                    throw respErr;
                }
                if (respInfo.statusCode == 200) {
                //   console.log(respBody);
                  data.push(`http://ph50dn23g.bkt.clouddn.com/${encodeURIComponent(respBody.key)}-blogPic`);
                  console.log(data)
                } else {
                  console.log(respInfo.statusCode);
                  console.log(respBody);
                }
                if(index == arr.length-1){
                    res.json({
                      "errno": 0,
                      data
                    }).end();
                }
                resolve('succeed');
              });
        });
         fs.unlink(localFile,function(error){
             if(error){
                 throw error;
             }
             console.log('删除本地文件成功');
         })

     })
    
    
    //  res.end()
    });
});
const postModel = require('../model/post');
const tagModel = require('../model/tags')
router.post('/post',(req,res)=>{
    let form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = path.resolve(__dirname,'../upload');
    form.keepExtensions = true;
    form.parse(req, function(err, fields, files) {
        if(err) throw err;
        let now = new Date();
        let tags = JSON.parse(fields.tags);
        tags.forEach((tag)=>{
            new Promise((resolve,reject)=>{
                tagModel.findOne({name: tag},(err,tag)=>{
                    if(err) throw err;
                    if(tag){
                        reject('the tag is already exist..');
                    }else{
                        resolve();
                    }
                })
            }).then(()=>{
                tagModel.create({name: tag},(err,newTag)=>{
                    if(err) throw err;
                })
            }).catch((errMsg)=>{
                console.log(errMsg);
            })
        })
        fields.tags = tags;
        fields.createDate = now;
        fields.updateDate = now;
        postModel.create(fields,(err,post)=>{
            console.log(post);
            if(err){
                res.status(500).end();
                throw err;
            }
            res.status(200).end()
        })
    })
})
module.exports = router