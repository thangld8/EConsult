var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;

const user = new Schema({
  user_name: String,
  password: String,
});

module.exports = mongoose.model('User', user);