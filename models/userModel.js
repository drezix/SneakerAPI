const mongoose = require('mongoose');

// Define the schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    accessCount: {
        type: Number,
        default: 0
    }
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;