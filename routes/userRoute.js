const express = require('express');
const router = express.Router();
const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');

// GET all users
router.get('/', catchAsync(async (req, res) => {
    const users = await User.find();
    res.json(users);
}));

// GET single user by ID
router.get('/:id', catchAsync(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        throw new NotFoundError('User');
    }
    res.json(user);
}));

// POST new user
router.post('/', catchAsync(async (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        throw new ValidationError('Name and email are required');
    }
    
    const user = new User(req.body);
    const savedUser = await user.save();
    res.status(201).json(savedUser);
}));

// PUT update user
router.put('/:id', catchAsync(async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );
    if (!updatedUser) {
        throw new NotFoundError('User');
    }
    res.json(updatedUser);
}));

// DELETE user
router.delete('/:id', catchAsync(async (req, res) => {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
        throw new NotFoundError('User');
    }
    res.json({ message: 'User deleted successfully' });
}));

module.exports = router; 