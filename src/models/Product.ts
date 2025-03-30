import mongoose, { Schema } from 'mongoose';

const ProductSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for this product'],
    maxlength: [100, 'Name cannot be more than 100 characters'],
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price for this product'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description for this product'],
  },
  shortDescription: {
    type: String,
    required: [true, 'Please provide a short description for this product'],
    maxlength: [200, 'Short description cannot be more than 200 characters'],
  },
  images: [{
    type: String,
    required: [true, 'Please provide at least one image for this product'],
  }],
  inStock: {
    type: Boolean,
    default: true,
  },
  category: {
    type: String,
    required: [true, 'Please specify a category for this product'],
  },
  tags: [{ type: String }],
  featured: {
    type: Boolean,
    default: false,
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

export default mongoose.models.Product || mongoose.model('Product', ProductSchema); 