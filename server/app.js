const express = require('express');
const app = express();
// app.use(express.urlencoded())
const loginRouter = require('./router/loginRouter');
const registerRouter = require('./router/registRouter');
const uploadRouter = require('./router/upload');
const getRouter = require('./router/getRouter')
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connect database succeed...')
});
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const sessionParser = require('./session');
app.use(sessionParser)
// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
app.use(loginRouter);
app.use(registerRouter);
app.use(uploadRouter);
app.use(getRouter);
app.get('/session',(req,res)=>{
    if(req.userInfo){
        res.json(req.userInfo).end();
    }else{
        res.status(403).end();
    }
})

const fs = require('fs');
const path = require('path');
app.get('/logout',(req,res)=>{
    let sessionId = req.cookies.sessionId;
    console.log(sessionId);
    if(req.userInfo){
        let session = JSON.parse(fs.readFileSync(path.resolve(__dirname,'./session.json'),'utf8'));
        session[sessionId] = undefined;
        fs.writeFileSync(path.resolve(__dirname,'./session.json'),
            JSON.stringify(session));
        res.cookie('sessionId',sessionId,{maxAge: 0}).end();
    }else res.end()
})
app.listen(80,'localhost',function(){
    console.log('listening...')
});