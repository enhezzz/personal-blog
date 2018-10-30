const mongoose = require('mongoose');
const schema = require('../schema/post');
const model = mongoose.model('post', schema);
module.exports = model;