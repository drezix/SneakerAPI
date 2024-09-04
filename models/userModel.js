const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

const userModel = mongoose.model('User', userSchema);

const saveUser = async(username, password, isAdmin = false) => {
    try {
        hashedPassword = await bcrypt.hash(password, 10);
        const user = new userModel({ username, password: hashedPassword, isAdmin});
        const savedUser = await user.save();
        return savedUser;
    } catch (error) {
        throw new Error('Failed to save user: ' + error.message);
    }
}

const updateUser = async(id, username) => {
    try {
        const user = await userModel.findByIdAndUpdate(id, {username}, {new: true});
        return user;
    } catch (error) {
        throw new Error('Failed to update user: ' + error.message);
    }
}

const removeUser = async(id) => {
    try {    
        const user = await userModel.findByIdAndDelete({_id:id});
        return user;
    } catch (error) {
        throw new Error('Failed to remove user: ' + error.message);
    }
}

const listUser = async() => {
    try {
        const user = await userModel.find();
        return user;
    } catch (error) {
        throw new Error('Failed to list user: ' + error.message);
    }        
}

const getUserID = async(id) => {
    try{
        const user = await userModel.findById(id);
        return user;
    } catch (error) {
        throw new Error('Failed to get user: ' + error.message);
    }
}

module.exports = {
    userModel,
    saveUser,
    updateUser,
    removeUser,
    listUser,
    getUserID
};