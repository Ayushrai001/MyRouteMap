import mongoose from 'mongoose';

const tourSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Tour title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: [true, 'Tour description is required'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  shortDescription: {
    type: String,
    required: [true, 'Short description is required'],
    maxlength: [200, 'Short description cannot exceed 200 characters']
  },
  price: {
    type: Number,
    required: [true, 'Tour price is required'],
    min: [0, 'Price cannot be negative']
  },
  discountPrice: {
    type: Number,
    min: [0, 'Discount price cannot be negative']
  },
  duration: {
    days: {
      type: Number,
      required: [true, 'Duration in days is required'],
      min: [1, 'Duration must be at least 1 day']
    },
    nights: {
      type: Number,
      required: [true, 'Duration in nights is required'],
      min: [0, 'Nights cannot be negative']
    }
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'Maximum group size is required'],
    min: [1, 'Group size must be at least 1']
  },
  difficulty: {
    type: String,
    required: [true, 'Difficulty level is required'],
    enum: ['Easy', 'Moderate', 'Difficult', 'Expert']
  },
  category: {
    type: String,
    required: [true, 'Tour category is required'],
    enum: ['Adventure', 'Cultural', 'Wildlife', 'Beach', 'City', 'Nature', 'Photography', 'Spiritual']
  },
  location: {
    country: {
      type: String,
      required: [true, 'Country is required']
    },
    city: {
      type: String,
      required: [true, 'City is required']
    },
    address: String,
    coordinates: {
      type: [Number], // [longitude, latitude]
      index: '2dsphere'
    }
  },
  startLocation: {
    description: String,
    coordinates: {
      type: [Number],
      index: '2dsphere'
    },
    address: String
  },
  locations: [{
    type: {
      type: String,
      default: 'Point',
      enum: ['Point']
    },
    coordinates: [Number],
    address: String,
    description: String,
    day: Number
  }],
  images: [{
    url: {
      type: String,
      required: true
    },
    caption: String,
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],
  itinerary: [{
    day: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    activities: [String],
    meals: {
      breakfast: { type: Boolean, default: false },
      lunch: { type: Boolean, default: false },
      dinner: { type: Boolean, default: false }
    },
    accommodation: String
  }],
  included: [String],
  notIncluded: [String],
  requirements: [String],
  whatToBring: [String],
  guides: [{
    name: String,
    experience: String,
    languages: [String],
    photo: String
  }],
  availability: [{
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    availableSpots: {
      type: Number,
      required: true
    },
    price: Number // Optional price override for specific dates
  }],
  ratingsAverage: {
    type: Number,
    default: 0,
    min: [0, 'Rating must be above 0'],
    max: [5, 'Rating must be below 5.0'],
    set: val => Math.round(val * 10) / 10
  },
  ratingsQuantity: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  tags: [String],
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
tourSchema.index({ price: 1, ratingsAverage: -1 });
tourSchema.index({ category: 1 });
tourSchema.index({ 'location.coordinates': '2dsphere' });
tourSchema.index({ slug: 1 });
tourSchema.index({ isActive: 1, isFeatured: -1 });

// Create slug from title
tourSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }
  next();
});

// Virtual for reviews
tourSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'tour',
  localField: '_id'
});

// Virtual for bookings count
tourSchema.virtual('bookingsCount', {
  ref: 'Booking',
  foreignField: 'tour',
  localField: '_id',
  count: true
});

// Calculate average rating
tourSchema.statics.calcAverageRatings = async function(tourId) {
  const stats = await this.aggregate([
    {
      $match: { _id: tourId }
    },
    {
      $lookup: {
        from: 'reviews',
        localField: '_id',
        foreignField: 'tour',
        as: 'reviews'
      }
    },
    {
      $addFields: {
        ratingsQuantity: { $size: '$reviews' },
        ratingsAverage: { $avg: '$reviews.rating' }
      }
    }
  ]);

  if (stats.length > 0) {
    await this.findByIdAndUpdate(tourId, {
      ratingsQuantity: stats[0].ratingsQuantity,
      ratingsAverage: stats[0].ratingsAverage || 0
    });
  }
};

export default mongoose.model('Tour', tourSchema);