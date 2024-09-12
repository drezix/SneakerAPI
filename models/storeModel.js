const mongoose = require('mongoose');

// Define the schema
const storeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    sneakers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sneaker'
    }]   
});

const storeModel = mongoose.model('Store', storeSchema);

module.exports = storeModel;
