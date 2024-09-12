const orderModel = require('../models/orderModel');
const storeModel = require('../models/storeModel');
const storeUtils = require('../utils/storeUtils');
const userUtils = require('../utils/userUtils');
const orderUtils = require('../utils/orderUtils');

exports.createOrder = async (req, res) => {
    const { userId, storeId } = req.params;
    const { items } = req.body;

    try {
        // Verify if user exists by username
        const userExists = await userUtils.checkIfUserExistsByID(userId);
        if (!userExists) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Verify if store exists
        await storeUtils.checkIfStoreExists(storeId);

        // Creates the order
        const newOrder = new orderModel({
            user: userId,
            store: storeId,
            items
        });

        const savedOrder = await newOrder.save();

        for (const item of items) {
            await storeUtils.updateStore(storeId, item.sneaker);
        }
        
        res.status(201).json({ message: 'Order created', savedOrder });
    } catch (error) {
        res.status(500).json({ message: 'Error creating order', error: error.message });
    }
};

exports.updateOrder = async (req, res) => {
    const { orderId, storeId } = req.params;
    const { items } = req.body;

    try {
        // Verify if order exists
        await orderUtils.checkIfOrderExists(orderId);

        // Verify if store exists
        await storeUtils.checkIfStoreExists(storeId);

        // Atualiza a ordem
        const updatedOrder = await orderModel.findByIdAndUpdate(
            orderId, 
            { items, store: storeId }, 
            { new: true }
        );

        // Atualiza a loja com os sneakers da ordem
        for (const item of items) {
            await storeUtils.updateStore(storeId, item.sneakerId);
        }

        res.status(200).json({ message: 'Order updated', updatedOrder });
    } catch (error) {
        res.status(500).json({ message: 'Error updating order', error: error.message });
    }
};

exports.removeOrder = async (req, res) => {
    const { orderId } = req.params;

    try {
        // Verify if order exists
        await orderUtils.checkIfOrderExists(orderId);

        const order = await orderModel.findByIdAndDelete(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ message: 'Order removed' });
    } catch (error) {
        res.status(500).json({ message: 'Error removing order', error: error.message });
    }
};

exports.getOrderById = async (req, res) => {
    const { orderId } = req.params;

    try {
        // Fount order by ID
        const order = await orderModel.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving order', error: error.message });
    }
};

exports.finalizeOrder = async (req, res) => {
    const { orderId, storeId } = req.params;

    try {
        // Verify if order exists
        await orderUtils.checkIfOrderExists(orderId);

        const order = await orderModel.findById(orderId).populate('items.sneakerId');
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Verify if store exists
        await storeUtils.checkIfStoreExists(storeId);

        const store = await storeModel.findById(storeId).populate('sneakers');
        if (!store) {
            return res.status(404).json({ message: 'Store not found' });
        }

        // Verify if order belongs to store
        if (order.store.toString() !== storeId) {
            return res.status(400).json({ message: 'Order does not belong to this store' });
        }

        // Update the sneakers in the store
        for (const item of order.items) {
            const sneakerInStore = store.sneakers.find(sneaker => sneaker._id.toString() === item.sneakerId._id.toString());
            
            if (!sneakerInStore) {
                return res.status(400).json({ message: `Sneaker ${item.sneakerId.name} not found in store` });
            }

            // Verify quantity
            if (sneakerInStore.quantity < item.quantity) {
                return res.status(400).json({ message: `Not enough quantity for sneaker ${item.sneakerId.name} in store` });
            }

            // Update quantity
            sneakerInStore.quantity -= item.quantity;

            // Saves the store
            await storeUtils.updateStore(storeId, item.sneaker);
        }

        // Finalize order
        order.status = 'completed';
        await order.save();

        res.status(200).json({ message: 'Order finalized successfully', order });
    } catch (error) {
        res.status(500).json({ message: 'Error finalizing order', error: error.message });
    }
};