import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  tour: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tour',
    required: [true, 'Booking must belong to a tour']
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Booking must belong to a user']
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required']
  },
  endDate: {
    type: Date,
    required: [true, 'End date is required']
  },
  participants: {
    adults: {
      type: Number,
      required: [true, 'Number of adults is required'],
      min: [1, 'At least one adult is required']
    },
    children: {
      type: Number,
      default: 0,
      min: [0, 'Children count cannot be negative']
    },
    infants: {
      type: Number,
      default: 0,
      min: [0, 'Infants count cannot be negative']
    }
  },
  participantDetails: [{
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    dateOfBirth: Date,
    passportNumber: String,
    nationality: String,
    dietaryRequirements: String,
    medicalConditions: String,
    emergencyContact: {
      name: String,
      phone: String,
      relationship: String
    }
  }],
  pricing: {
    basePrice: {
      type: Number,
      required: true
    },
    discountAmount: {
      type: Number,
      default: 0
    },
    taxAmount: {
      type: Number,
      required: true
    },
    totalAmount: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: 'USD'
    }
  },
  payment: {
    status: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'failed', 'refunded'],
      default: 'pending'
    },
    method: {
      type: String,
      enum: ['credit_card', 'debit_card', 'paypal', 'bank_transfer', 'cash']
    },
    transactionId: String,
    paidAt: Date,
    refundedAt: Date,
    refundAmount: Number
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed', 'no_show'],
    default: 'pending'
  },
  specialRequests: String,
  notes: String,
  cancellation: {
    cancelledAt: Date,
    cancelledBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    reason: String,
    refundAmount: Number
  },
  confirmation: {
    confirmedAt: Date,
    confirmationNumber: {
      type: String,
      unique: true
    }
  },
  communication: [{
    type: {
      type: String,
      enum: ['email', 'sms', 'call', 'note']
    },
    subject: String,
    message: String,
    sentAt: {
      type: Date,
      default: Date.now
    },
    sentBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
bookingSchema.index({ user: 1, createdAt: -1 });
bookingSchema.index({ tour: 1, startDate: 1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ 'payment.status': 1 });
bookingSchema.index({ 'confirmation.confirmationNumber': 1 });

// Generate confirmation number
bookingSchema.pre('save', function(next) {
  if (this.isNew && !this.confirmation.confirmationNumber) {
    this.confirmation.confirmationNumber = 'MRM' + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase();
  }
  next();
});

// Virtual for total participants
bookingSchema.virtual('totalParticipants').get(function() {
  return this.participants.adults + this.participants.children + this.participants.infants;
});

// Virtual for booking duration
bookingSchema.virtual('duration').get(function() {
  if (this.startDate && this.endDate) {
    return Math.ceil((this.endDate - this.startDate) / (1000 * 60 * 60 * 24));
  }
  return 0;
});

// Method to calculate total amount
bookingSchema.methods.calculateTotal = function() {
  const subtotal = this.pricing.basePrice - this.pricing.discountAmount;
  this.pricing.totalAmount = subtotal + this.pricing.taxAmount;
  return this.pricing.totalAmount;
};

// Method to confirm booking
bookingSchema.methods.confirm = function() {
  this.status = 'confirmed';
  this.confirmation.confirmedAt = new Date();
  return this.save();
};

// Method to cancel booking
bookingSchema.methods.cancel = function(reason, cancelledBy) {
  this.status = 'cancelled';
  this.cancellation.cancelledAt = new Date();
  this.cancellation.reason = reason;
  this.cancellation.cancelledBy = cancelledBy;
  return this.save();
};

// Static method to get booking statistics
bookingSchema.statics.getStats = async function() {
  const stats = await this.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
        totalRevenue: { $sum: '$pricing.totalAmount' }
      }
    }
  ]);
  return stats;
};

export default mongoose.model('Booking', bookingSchema);