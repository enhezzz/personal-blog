const express = require('express');
const router = express.Router();
const uuid = require('uuid/v4');
const formidable = require('formidable');
const userModel = require('../model/user');
const fs = require('fs');
const path = require('path');
// const userModel = require('../model/user')
router.post('/login',(req,res) => {
    const form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.parse(req, function(err, fields) {
        userModel.findOne(fields,(err,user)=>{
            if(err) throw err;
            console.log(user)
            if(user){
                const sessionId = uuid();
                const session = JSON.parse(fs.readFileSync(path.resolve(__dirname,'../session.json')));
                session[sessionId] = {
                    code:  user.code,
                    username: user.username,
                    account: user.account,
                    phone: user.phone
                }
                console.log(session[sessionId])
                let content = JSON.stringify(session)
                fs.writeFileSync(path.resolve(__dirname,'../session.json'),content)
                res.cookie('sessionId',sessionId,{maxAge: 86400000});
                res.json(user).end();
            }else{
                res.status(501).end()
            }
        })
    });
    // userModel.find()
    
})
module.exports = router;