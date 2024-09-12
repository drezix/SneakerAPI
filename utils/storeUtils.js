const storeModel = require('../models/storeModel');
const mongoose = require('mongoose');

// Update store with new sneaker
const updateStore = async (storeId, sneakerId) => {
    try {
        const store = await storeModel.findById(storeId);
        if (!store) {
            throw new Error('Store not found');
        }

        if (!store.sneakers.includes(sneakerId)) {
            store.sneakers.push(sneakerId);
            const updatedStore = await store.save();
            return updatedStore;
        }

        return store;  // Retorna a loja sem modificações se o sneaker já estiver presente.
    } catch (error) {
        throw new Error(`Error updating store: ${error.message}`);
    }
};

// Check if store exists by ID
const checkIfStoreExists = async (storeId) => {
    try{
        const store = await storeModel.findById(storeId);
            if (!store) {
                throw new Error('Store not found');
            } 
        return store;
    } catch (error) {
        throw new Error(`Error checking if store exists: ${error.message}`);
    }
};

module.exports = { 
    updateStore,
    checkIfStoreExists
};