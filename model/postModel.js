import mongoose, { Schema } from "mongoose";

const post = new Schema({
  embeddedLink: String,
  type: String,
  subject: String,
  title: String,
  backgroundColor: String,
  content: String,
  writer: String,
  createDate: Date,


});


export default mongoose.model("Post", post);
