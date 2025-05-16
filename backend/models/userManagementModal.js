import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const usersSchema = new Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    unique: true, // Prevent duplicate usernames
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: [
      'client',
      'retail',
      'deptmanager',
      'itmanagement',
      'itmanager', // ✅ Added this missing role
      'itexec'
    ],
    required: true,
  },
  department: {
    type: String,
    enum: [
      'Finance',
      'Operations',
      'Sales',
      'IT Department',
      'Retail Shops'
    ],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
}, { collection: 'users' });

export default model('users', usersSchema);
