import mongoose, { Schema, Document } from 'mongoose';

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  createdAt: Date;
}

const userSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  createdAt: { type: Date, default: Date.now }
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
