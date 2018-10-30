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
// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
app.use(loginRouter);
app.use(registerRouter);
app.use(uploadRouter);
app.use(getRouter)
app.listen(80,'localhost',function(){
    console.log('listening...')
});