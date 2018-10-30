const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const userModel = require('../model/user')
// const userModel = require('../model/user')
router.post('/login',(req,res) => {
    const form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.parse(req, function(err, fields) {
        userModel.findOne(fields,(err,user)=>{
            if(err) throw err;
            console.log(user)
            if(user){
                res.json(user).end();
            }else{
                res.status(501).end()
            }
        })
    });
    // userModel.find()
    
})
module.exports = router;