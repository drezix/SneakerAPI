const { userModel } = require('../models/userModel');
const { sneakerModel } = require('../models/sneakerModel');
const bcrypt = require('bcrypt');

exports.installDB = async (req, res) => {
    try {
        // Delete all users and sneakers
        await userModel.deleteMany({});
        await sneakerModel.deleteMany({});

        // Define users
        const usersCreate = [
            { username: 'admin1', password: 'admintest', isAdmin: true },
            { username: 'user1', password: 'usertest', isAdmin: false },
            { username: 'user2', password: 'usertest', isAdmin: false },
        ];

        // Hash the passwords
        const hashedUsers = await Promise.all(usersCreate.map(async (user) => {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            return { ...user, password: hashedPassword };
        }));

        // Create users
        const users = await userModel.insertMany(hashedUsers);

        // Create sneakers
        const sneakers = await sneakerModel.insertMany([
            { name: 'Sneaker1', price: 100, size: 42, brand: 'brand1' },
            { name: 'Sneaker2', price: 200, size: 43, brand: 'brand2' },
            { name: 'Sneaker3', price: 300, size: 44, brand: 'brand3' },
        ]);

        res.status(200).json({ message: 'Database installed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error installing database', error: error.message || error});
    }
}

