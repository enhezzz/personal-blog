const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  account:  {
      type: String,
      required: true
  },
  username: {
      type: String,
      required: true
  },
  password: {
      type: String,
      required: true
  },
  phone: {
      type: String,
      default: '00000000000'
  }
});
module.exports = schema;