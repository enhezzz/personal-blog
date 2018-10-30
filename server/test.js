// const fs = require('fs');
// const path = require('path')
// const readable = fs.createReadStream(path.resolve(__dirname,'1.txt'),{
//     encoding: 'utf-8'
// })
const {Readable} = require('stream');
const readable = new Readable();
// readable.read(7);
readable.setEncoding('utf8');
readable.push('123456789')
readable.push(null)
console.log(readable.read(100))
readable.on('data', (chunk) => {
    
    console.log(readable.readableLength);
    
    console.log(chunk)
    console.log(`接收到 ${chunk.length} 个字节的数据`);
  });