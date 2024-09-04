const mongoose = require('mongoose');

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

const saveSneaker = async(name, price, size, brand) => {
    try {
        const sneaker = new sneakerModel({name, price, size, brand});
        const savedSneaker = await sneaker.save();
        return savedSneaker;
    } catch (error) {
        throw new Error('Failed to save sneaker: ' + error.message);
    }
}

const updateSneaker = async(id, name, price, size, brand) => {
    try {
        const sneaker = await sneakerModel.findByIdAndUpdate(id, {name, price, size, brand}, {new: true});
        return sneaker;
    } catch (error) {
        throw new Error('Failed to update sneaker: ' + error.message);
    }
}

const removeSneaker = async(id) => {
    try {
        const sneaker = await sneakerModel.findByIdAndDelete({_id:id});
        return sneaker;
    } catch (error) {
        throw new Error('Failed to remove sneaker: ' + error.message);
    }
}

const listSneaker = async() => {
    try {
        const sneaker = await sneakerModel.find();
        return sneaker;
    } catch (error) {
        throw new Error('Failed to list sneaker: ' + error.message);
    }
}

module.exports = {
    sneakerModel,
    saveSneaker,
    updateSneaker,
    removeSneaker,
    listSneaker
}