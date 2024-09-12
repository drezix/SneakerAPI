const mongoose = require('mongoose');

// Define the schema
const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store',
        required: true,
    },
    items: [{
        sneakerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Sneaker',
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
    }],
    status: { 
        type: String, 
        enum: [
            'pending', 'completed'
        ], 
        default: 'pending' 
    }
});

const orderModel = mongoose.model('Order', orderSchema);

module.exports = orderModel;
