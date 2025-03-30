import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
  },
  image: {
    type: String,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  orders: [{
    type: Schema.Types.ObjectId,
    ref: 'Order',
  }],
  tutorBookings: [{
    type: Schema.Types.ObjectId,
    ref: 'Booking',
  }],
});

export default mongoose.models.User || mongoose.model('User', UserSchema); 