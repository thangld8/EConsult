import mongoose, { Schema } from 'mongoose';

const user = new Schema({
  user_name: String,
  password: String,
});



export default mongoose.model('User', user);