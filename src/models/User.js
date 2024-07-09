import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  its: {
    type: Number,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['super admin', 'admin', 'user'],
    default: 'user',
  },
  topics: {
    type: [String],
    default: [],
  }
});

UserSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id }, 'asdfghjkL007', {
    expiresIn: '1d'
  });
  return token;
};

export default mongoose.models.User || mongoose.model("User", UserSchema);
