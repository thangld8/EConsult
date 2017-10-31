'use strict';


var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;

var post = new Schema({
  embeddedLink: String,
  type: String,
  subject: String,
  title: String,
  backgroundColor: String,
  content: String,
  writer: String,
  createDate: Date,
});
module.exports = mongoose.model("Post", post);
