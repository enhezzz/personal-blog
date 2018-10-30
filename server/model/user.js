const mongoose = require('mongoose');
const schema = require('../schema/user');
const model = mongoose.model('user', schema);
module.exports = model;