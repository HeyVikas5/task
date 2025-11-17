const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');
const {
  createTodoValidation,
  updateTodoValidation,
  handleValidationErrors,
} = require('../middleware/validateTodo');

// @route   GET /api/todos
// @desc    Get all todos with optional filtering
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    const { completed, priority, sort } = req.query;
    
    // Build query
    let query = {};
    
    if (completed !== undefined) {
      query.completed = completed === 'true';
    }
    
    if (priority) {
      query.priority = priority;
    }
    
    // Build sort
    let sortOption = {};
    if (sort === 'oldest') {
      sortOption = { createdAt: 1 };
    } else if (sort === 'priority') {
      sortOption = { priority: -1, createdAt: -1 };
    } else {
      sortOption = { createdAt: -1 }; // Default: newest first
    }
    
    const todos = await Todo.find(query).sort(sortOption);
    
    res.status(200).json({
      success: true,
      count: todos.length,
      data: todos,
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/todos/stats/summary
// @desc    Get todo statistics
// @access  Public
router.get('/stats/summary', async (req, res, next) => {
  try {
    const total = await Todo.countDocuments();
    const completed = await Todo.countDocuments({ completed: true });
    const active = await Todo.countDocuments({ completed: false });
    
    res.status(200).json({
      success: true,
      data: {
        total,
        completed,
        active,
        completionRate: total > 0 ? ((completed / total) * 100).toFixed(2) : 0,
      },
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/todos/:id
// @desc    Get single todo by ID
// @access  Public
router.get('/:id', async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);
    
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found',
      });
    }
    
    res.status(200).json({
      success: true,
      data: todo,
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/todos
// @desc    Create a new todo
// @access  Public
router.post(
  '/',
  createTodoValidation,
  handleValidationErrors,
  async (req, res, next) => {
    try {
      const todo = await Todo.create(req.body);
      
      res.status(201).json({
        success: true,
        message: 'Todo created successfully',
        data: todo,
      });
    } catch (error) {
      next(error);
    }
  }
);

// @route   PUT /api/todos/:id
// @desc    Update a todo
// @access  Public
router.put(
  '/:id',
  updateTodoValidation,
  handleValidationErrors,
  async (req, res, next) => {
    try {
      const todo = await Todo.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true, // Return updated document
          runValidators: true, // Run schema validators
        }
      );
      
      if (!todo) {
        return res.status(404).json({
          success: false,
          message: 'Todo not found',
        });
      }
      
      res.status(200).json({
        success: true,
        message: 'Todo updated successfully',
        data: todo,
      });
    } catch (error) {
      next(error);
    }
  }
);

// @route   DELETE /api/todos/:id
// @desc    Delete a todo
// @access  Public
router.delete('/:id', async (req, res, next) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found',
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Todo deleted successfully',
      data: {},
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;