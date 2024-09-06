const mongoose = require('mongoose');

// Define the schema
const sneakerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
});

const sneakerModel = mongoose.model('Sneaker', sneakerSchema);

module.exports = sneakerModel;