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

//handle static files
app.use(express.static(path.join(__dirname,'./SSR/js')))





//SSR
//声明window = undefined，因为在组件的声明周期上用到了有关浏览器的api
window = undefined
const renderer = require('vue-server-renderer').createRenderer({
    template: require('fs').readFileSync(path.join(__dirname,'./SSR/index.html'),'utf-8')
});
const createApp = require('./SSR/dist/app.bundle.js').default;
app.get('*',(req,res)=> {
    console.log(req.url)
    //为了维持session信息注入userInfo
    const context = {url: req.url ,userInfo: req.userInfo};
    createApp(context).then(app=> {
        renderer.renderToString(app,context,(err,html)=> {
            if(err){
                return res.status(500).end(err.toString())
            }
            res.end(html)
        })
    },(err)=> {
        res.status(404).end(err.toString());
    })
});

app.listen(80,'localhost',function(){
    console.log('listening...')
});