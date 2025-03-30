import mongoose, { Schema } from 'mongoose';

const BlogSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for this blog post'],
    maxlength: [100, 'Title cannot be more than 100 characters'],
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: String,
    required: [true, 'Please provide the content for this blog post'],
  },
  excerpt: {
    type: String,
    required: [true, 'Please provide a short excerpt for this blog post'],
    maxlength: [200, 'Excerpt cannot be more than 200 characters'],
  },
  coverImage: {
    type: String,
    required: [true, 'Please provide a cover image for this blog post'],
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  published: {
    type: Boolean,
    default: false,
  },
  tags: [{ type: String }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema); 