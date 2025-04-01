const express = require('express');
const router = express.Router();
const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management API
 */

/**
* @swagger
* /user:
*   get:
*     summary: Get all users
*     tags: [Users]
*     description: Retrieve a list of users from the database
*     responses:
*       200:
*         description: A list of users
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 type: object
*                 properties:
*                   id:
*                     type: string
*                     example: 1
*                   name:
*                     type: string
*                     example: John Doe
*                   email:
*                     type: string
*                     example: johndoe@test.com
*/
router.get('/', catchAsync(async (req, res) => {
    const users = await User.find();
    res.json(users);
}));

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: A user object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: John Doe
 *                 email:
 *                   type: string
 *                   example: johndoe@test.com
 *       404:
 *         description: User not found
 */
router.get('/:id', catchAsync(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        throw new NotFoundError('User');
    }
    res.json(user);
}));

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Jane Doe
 *               email:
 *                 type: string
 *                 example: janedeo@test.com
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 2
 *                 name:
 *                   type: string
 *                   example: Jane Doe
 *                 email:
 *                   type: string
 *                   example: janedeo@test.com
 */
router.post('/', catchAsync(async (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        throw new ValidationError('Name and email are required');
    }
    
    const user = new User(req.body);
    const savedUser = await user.save();
    res.status(201).json(savedUser);
}));

/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Update an existing user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Updated
 *               email:
 *                 type: string
 *                 example: johnupdated@test.com
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: John Updated
 *                 email:
 *                   type: string
 *                   example: johnupdated@test.com
 *       404:
 *         description: User not found
 */
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

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete('/:id', catchAsync(async (req, res) => {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
        throw new NotFoundError('User');
    }
    res.json({ message: 'User deleted successfully' });
}));

module.exports = router; 