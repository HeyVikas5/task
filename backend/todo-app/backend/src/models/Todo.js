const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
      default: '',
    },
    completed: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    dueDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Add index for better query performance
todoSchema.index({ completed: 1, createdAt: -1 });

// Virtual for todo status
todoSchema.virtual('status').get(function () {
  if (this.completed) return 'completed';
  if (this.dueDate && new Date(this.dueDate) < new Date()) return 'overdue';
  return 'active';
});

// Ensure virtuals are included in JSON
todoSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret.__v;
    return ret;
  },
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;