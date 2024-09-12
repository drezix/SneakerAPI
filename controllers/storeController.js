const storeModel = require('../models/storeModel');
const sneakerModel = require('../models/sneakerModel');

// Create a new store
exports.createStore = async (req, res) => {
    try {
        const store = new storeModel(req.body);
        await store.save();
        res.status(201).json({ message: 'Store created successfully', store });
    } catch (error) {
        res.status(500).json({ message: 'Error creating store', error: error.message });
    }
};

// Add sneaker to store
exports.addSneakerToStore = async (req, res) => {
    try {
        const { storeId, sneakerId } = req.params;
        const store = await storeModel.findById(storeId);
        if (!store) return res.status(404).json({ message: 'Store not found' });

        const sneaker = await sneakerModel.findById(sneakerId);
        if (!sneaker) return res.status(404).json({ message: 'Sneaker not found' });

        if (store.sneakers.includes(sneakerId)) return res.status(400).json({ message: 'Sneaker already in store' });

        store.sneakers.push(sneakerId);
        await store.save();

        res.status(200).json({ message: 'Sneaker added to store', store });
    } catch (error) {
        res.status(500).json({ message: 'Error adding sneaker to store', error: error.message });
    }
};

// List all stores
exports.listStores = async (req, res) => {
    try {
        const stores = await storeModel.find();
        res.status(200).json({ stores });
    } catch (error) {
        res.status(500).json({ message: 'Error listing stores', error: error.message });
    }
}

// List all sneakers in a store
exports.listSneakersInStore = async (req, res) => {
    try {
        const { storeId } = req.params;
        const store = await storeModel.findById(storeId).populate('sneakers');
        if (!store) return res.status(404).json({ message: 'Store not found' });

        res.status(200).json({ sneakers: store.sneakers });
    } catch (error) {
        res.status(500).json({ message: 'Error listing sneakers in store', error: error.message });
    }
};
