const orderModel = require('../models/orderModel');

// Check if order exists by ID
const checkIfOrderExists = async (id) => {
    try{
        const order = await orderModel.findById(id);
        return !!order;
    } catch (error) {
        throw new Error(`Error checking if order exists: ${error.message}`);
    }
};

module.exports = { checkIfOrderExists};
