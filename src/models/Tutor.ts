import mongoose, { Schema } from 'mongoose';

const TutorSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please provide the tutor name'],
    maxlength: [100, 'Name cannot be more than 100 characters'],
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  profileImage: {
    type: String,
    required: [true, 'Please provide a profile image for this tutor'],
  },
  specialty: {
    type: String,
    required: [true, 'Please provide the tutor specialty'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description for this tutor'],
  },
  hourlyRate: {
    type: Number,
    required: [true, 'Please provide an hourly rate for this tutor'],
  },
  calendlyLink: {
    type: String,
    required: [true, 'Please provide a Calendly link for booking'],
  },
  experience: {
    type: Number, // Years of experience
    required: [true, 'Please provide years of experience'],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  subjects: [{ type: String }],
  availability: {
    type: String,
    enum: ['weekdays', 'weekends', 'both'],
    default: 'both',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Tutor || mongoose.model('Tutor', TutorSchema); 