const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = new Schema({
    title:  {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    createDate: {
        type: Date,
        required: true
    },
    updateDate: {
      type: Date,
      require: true
    },
    tags: {
      type: [String],
      required: true
    },
    views: {
        type: Number,
        default: 0
    },
    content: {
        type: String,
        required: true
    }
});
module.exports = schema;