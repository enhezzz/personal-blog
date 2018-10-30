const express = require('express');
const router = express.Router();
const userModel = require('../model/user');
const formidable = require('formidable');
router.post('/register',(req,res) => {
    const form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.parse(req, function(err, fields) {
        let account = fields.account;
        new Promise((resolve,reject)=>{
            userModel.findOne({account},(err,user)=>{
                if(err) throw err;
                if(user){
                    resolve(user)
                }else{
                    resolve()
                }
            });
        }).then(user=>{
            if(user){
                res.status(403).end()
            }else{
                userModel.create(fields,(err,user)=>{
                    if(err) throw err;
                    if(user){
                        res.end();
                    }
                })
            }
        });

    })
})
module.exports = router;