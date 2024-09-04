const express = require('express');
const router = express.Router();
const { saveUser, updateUser, removeUser, listUser, getUserID } = require('../models/userModel');

router.post('/', async (req, res) => {
    const {username, password, isAdmin} = req.body;
    try {
      const newUser = await saveUser(username, password, isAdmin);
      res.status(201).json({user: newUser});
    } catch (error) {
      res.status(500).send({msg: "Error saving user", error: error.message});
    }
});
  
router.put('/:id', async (req, res) => {
    const {id} = req.params;
    const {username} = req.body;
    try {
        const updatedUser = await updateUser(id, username);
        res.status(200).json({user: updatedUser});
    } catch (error) {
        res.status(500).send({msg: "Error updating user", error: error.message});
    }
});

router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const removedUser = await removeUser(id);
        res.status(200).json({user: removedUser});
        console.log('User removed');
    } catch (error) {
        res.status(500).send({msg: "Error removing user", error: error.message});
    }
});

router.get('/', async (req, res) => {
    try {
        const users = await listUser();
        res.status(200).json({users});
    } catch (error) {
        res.status(500).send({msg: "Error listing users", error: error.message});
    }
});

router.get('/:id', async (req,res) => {
    const {id} = req.params;
    try{
        const user = await getUserID(id);
        res.status(200).json({user});
    } catch {
        res.status(500).send({msg: "Error getting user by ID", error: error.message});
    }
});

module.exports = router;