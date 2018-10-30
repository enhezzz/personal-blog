const mongoose = require('mongoose');
const schema = require('../schema/tags');
const model = mongoose.model('tag', schema);
module.exports = model;