const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const dotenv = require('dotenv');

dotenv.config();

// Register a new user
exports.register = async (req, res) => {
    const { username, password, isAdmin = false } = req.body;

    try {
        // Verify if username already exists
        const existingUser = await userModel.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Creates a new user
        const user = new userModel({ username, password: hashedPassword, isAdmin });
        const savedUser = await user.save();
        return res.status(201).json({ user: savedUser });
    } catch (error) {
        return res.status(500).json({ msg: 'Error registering user', error: error.message });
    }
}

// Login
exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await userModel.findOne({ username });

        // Verify if user exists
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Password validation
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ msg: 'Invalid password' });
        }

        // Token generation
        const token = jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, process.env.SECRET_KEY, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ msg: 'Error logging in', error: error.message });
    }
};