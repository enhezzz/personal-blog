const fs = require('fs');
const path = require('path');
function session(req,res,next){
    const sessionId = req.cookies.sessionId;
    if(sessionId){
        const session = JSON.parse(fs.readFileSync(path.resolve(__dirname,'./session.json'),'utf8'));
        if(session[sessionId]){
         const userInfo = req.userInfo = {};
         if(session[sessionId].code)
         userInfo.code = session[sessionId].code;
         userInfo.username = session[sessionId].username;
         userInfo.account = session[sessionId].account;
         userInfo.phone = session[sessionId].phone;
         req.userInfo = userInfo;
        }
    }
    next();
}
module.exports = session;