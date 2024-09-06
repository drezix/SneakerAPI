const sneakerModel = require('../models/sneakerModel');

// Save a new sneaker (only admin)
exports.saveSneaker = async (req, res) => {
    const { name, price, size, brand } = req.body;
    try {
        const sneaker = new sneakerModel({ name, price, size, brand });
        const savedSneaker = await sneaker.save();
        res.status(201).json({ sneaker: savedSneaker });
    } catch (error) {
        res.status(500).json({ msg: 'Error saving sneaker', error: error.message });
    }
};

// Update a sneaker (only admin)
exports.updateSneaker = async (req, res) => {
    const { id } = req.params;
    const { name, price, size, brand } = req.body;
    try {
        const sneaker = await sneakerModel.findByIdAndUpdate(id, { name, price, size, brand }, { new: true });
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
    try {
        const sneaker = await sneakerModel.findByIdAndDelete(id);
        if (!sneaker) {
            return res.status(404).json({ msg: 'Sneaker not found' });
        }
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
