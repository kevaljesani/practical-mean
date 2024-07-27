const express = require('express');
const Task = require('../models/Tasks');
const { io } = require('../app');

const router = express.Router();

// Create Task
router.post('/', async (req, res) => {
  const { title, description, status, priority, dueDate, assignedTo } = req.body;
  try {
    const task = new Task({ title, description, status, priority, dueDate, assignedTo });
    await task.save();
    // Emit real-time event
    io.emit('task:create', task);

    // Notify specific user
    if (assignedTo) {
      io.to(assignedTo).emit('task:assigned', task);
    }
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get All Tasks with Filtering, Sorting, Pagination, and Search
router.get('/', async (req, res) => {
  const { status, priority, assignedTo, search, sortBy, sortOrder, page = 1, limit = 10 } = req.query;

  const query = {};
  if (status) query.status = status;
  if (priority) query.priority = priority;
  if (assignedTo) query.assignedTo = assignedTo;
  if (search) {
    query.$text = { $search: search };
  }

  const sortOptions = {};
  if (sortBy) {
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
  }

  try {
    const tasks = await Task.find(query)
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalTasks = await Task.countDocuments(query);
    res.json({
      totalTasks,
      totalPages: Math.ceil(totalTasks / limit),
      currentPage: parseInt(page),
      tasks
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get Task by ID
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update Task
router.put('/:id', async (req, res) => {
  const { title, description, status, priority, dueDate, assignedTo } = req.body;
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, { title, description, status, priority, dueDate, assignedTo }, { new: true });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete Task
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
