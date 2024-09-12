const userModel = require('../models/userModel');

// Check if user exists by username
const checkIfUserExistsByUsername = async (username) => {
    try{
        const user = await userModel.findOne({ username });
        return !!user;
    } catch (error) {
        throw new Error(`Error checking if user exists: ${error.message}`);
    }
};

// Check if user exists by ID
const checkIfUserExistsByID = async (id) => {
    try{
        const user = await userModel.findById(id);
        return !!user;
    } catch (error) {
        throw new Error(`Error checking if user exists: ${error.message}`);
    }
};

module.exports = { checkIfUserExistsByUsername, checkIfUserExistsByID };