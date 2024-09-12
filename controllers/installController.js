const userModel = require('../models/userModel');
const sneakerModel = require('../models/sneakerModel');
const storeModel = require('../models/storeModel');
const orderModel = require('../models/orderModel');
const bcrypt = require('bcrypt');

// Install the database with some users and sneakers
exports.installDB = async (req, res) => {
    try {
        // Delete all database
        await userModel.deleteMany({});
        await storeModel.deleteMany({});
        await sneakerModel.deleteMany({});
        await orderModel.deleteMany({});

        // Define users
        const usersCreate = [
            { username: 'admin1', password: 'admintest', isAdmin: true },
            { username: 'admin2', password: 'admintest', isAdmin: true },
            { username: 'user1', password: 'usertest', isAdmin: false },
            { username: 'user2', password: 'usertest', isAdmin: false },
            { username: 'user3', password: 'usertest', isAdmin: false },
        ];

        // Hash the passwords
        const hashedUsers = await Promise.all(usersCreate.map(async (user) => {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            return { ...user, password: hashedPassword };
        }));

        // Create users
        const users = await userModel.insertMany(hashedUsers);

        // Create stores
        const stores = await storeModel.insertMany([
            { name: 'Store1', phone: '99-999999991'},
            { name: 'Store2', phone: '99-999999992'},
            { name: 'Store3', phone: '99-999999993'},
            { name: 'Store4', phone: '99-999999994'},
            { name: 'Store5', phone: '99-999999995'}
        ]); 

        if (!stores || stores.length === 0) {
            throw new Error('No stores were created');
        }

        // Create sneakers
        const sneakersCreate = await sneakerModel.insertMany([
            { name: 'Sneaker1', price: 100, size: 42, brand: 'brand1', stores: [] },
            { name: 'Sneaker2', price: 200, size: 43, brand: 'brand2', stores: [] },
            { name: 'Sneaker3', price: 300, size: 44, brand: 'brand3', stores: [] },
            { name: 'Sneaker4', price: 400, size: 45, brand: 'brand4', stores: [] },
            { name: 'Sneaker5', price: 500, size: 46, brand: 'brand5', stores: [] }
        ]);

        res.status(200).json({ message: 'Database installed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error installing database', error: error.message || error});
    }
}

// Drop all database
exports.dropDB = async (req, res) => {
    try {
        await userModel.deleteMany({});
        await storeModel.deleteMany({});
        await sneakerModel.deleteMany({});
        await orderModel.deleteMany({});
        res.status(200).json({ message: 'Database dropped successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error dropping database', error: error.message || error});
    }
}