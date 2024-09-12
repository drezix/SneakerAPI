const sneakerModel = require('../models/sneakerModel');
const storeModel = require('../models/storeModel');
const storeUtils = require('../utils/storeUtils');

// Save a new sneaker (only admin)
exports.saveSneaker = async (req, res) => {
    const { name, price, size, brand, storeId } = req.body;
    
    try {
        if (!storeId) {
            return res.status(400).json({ msg: 'Store ID is required' });
        }

        const store = await storeModel.findById(storeId);
        if (!store) {
            return res.status(404).json({ msg: 'Store not found' });
        }

        const sneaker = new sneakerModel({ name, price, size, brand, stores: [storeId] });
        const savedSneaker = await sneaker.save();

        // Update store
        await storeUtils.updateStore(storeId, savedSneaker._id);

        res.status(201).json({ sneaker: savedSneaker });
    } catch (error) {
        res.status(500).json({ msg: 'Error saving sneaker', error: error.message });
    }
};
// Update a sneaker (only admin)
exports.updateSneaker = async (req, res) => {
    const { id } = req.params;
    const { name, price, size, brand, storeId } = req.body;
    try {
        const updatedSneaker = await sneakerModel.findByIdAndUpdate(id, { name, price, size, brand, quantity, stores: [storeId] }, { new: true });

        // Update store
        await storeUtils.updateStore(storeId, updatedSneaker._id);

        if (!sneaker) {
            return res.status(404).json({ msg: 'Sneaker not found' });
        }
        res.status(200).json({ sneaker });
    } catch (error) {
        res.status(500).json({ msg: 'Error updating sneaker', error: error.message });
    }
};

// Remove a sneaker (only admin)
exports.removeSneaker = async (req, res) => {
    const { id } = req.params;
    const { storeId } = req.body;
    try {
        const sneaker = await sneakerModel.findByIdAndDelete(id);
        if (!sneaker) {
            return res.status(404).json({ msg: 'Sneaker not found' });
        }

        // Check if store ID is provided
        if (!storeId) {
            return res.status(400).json({ msg: 'Store ID is required' });
        }

        // Update store
        await storeUtils.updateStore(storeId);

        res.status(200).json({ msg: 'Sneaker removed successfully', sneaker });
    } catch (error) {
        res.status(500).json({ msg: 'Error removing sneaker', error: error.message });
    }
};

// List all sneakers
exports.listSneaker = async (req, res) => {
    try {
        const sneakers = await sneakerModel.find();
        res.status(200).json({ sneakers });
    } catch (error) {
        res.status(500).json({ msg: 'Error listing sneakers', error: error.message });
    }
};

exports.getSneakerByID = async (req, res) => {
    const { id } = req.params;
    try {
        const sneaker = await sneakerModel.findById(id);
        if (!sneaker) {
            return res.status(404).json({ msg: 'Sneaker not found' });
        }
        res.status(200).json({ sneaker });
    } catch (error) {
        res.status(500).json({ msg: 'Error getting sneaker', error: error.message });
    }
}
