const userModel = require('../models/userModel');

// Updates user (only admin)
exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { username } = req.body;

    try {
        // Update user in database
        const updatedUser = await userModel.findByIdAndUpdate(id, { username }, { new: true });

        // Verify if user was found
        if (!updatedUser) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Return updated user
        res.status(200).json({ user: updatedUser });
    } catch (error) {
        res.status(500).json({ msg: 'Error updating user', error: error.message });
    }
};

// Removes user (only admin)
exports.removeUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await userModel.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.status(200).json({ msg: 'User removed successfully', user });
    } catch (error) {
        res.status(500).json({ msg: 'Error removing user', error: error.message });
    }
};

// List all users (only admin)
exports.listUser = async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ msg: 'Error listing users', error: error.message });
    }
};

// Get user by ID (only admin)
exports.getByID = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await userModel.findById(id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ msg: 'Error getting user', error: error.message });
    }
};
