const express = require('express');
const router = express.Router();
const { saveSneaker, updateSneaker, removeSneaker, listSneaker } = require('../models/sneakerModel');

router.post('/', async (req, res) => {
    const {name, price, size, brand} = req.body;
    try {
        const newSneaker = await saveSneaker(name, price, size, brand);
        res.status(201).json({user: newSneaker});
    } catch (error) {
        res.status(500).send({msg: "Error saving user", error: error.message});
    }
});
  
router.put('/:id', async (req, res) => {
    const {id} = req.params;
    const {name, price, size, brand} = req.body;
    try {
        const updatedSneaker = await updateSneaker(id, name, price, size, brand);
        res.status(200).json({user: updatedSneaker});
    } catch (error) {
        res.status(500).send({msg: "Error updating user", error: error.message});
    }
});
  
router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const removedSneaker = await removeSneaker(id);
        res.status(200).json({sneaker: removedSneaker});
        console.log('Sneaker removed');
    } catch (error) {
        res.status(500).send({msg: "Error removing sneaker", error: error.message});
    }
});
  
router.get('/', async (req, res) => {
    try {
        const sneakers = await listSneaker();
        res.status(200).json({sneakers});
    }   catch (error) {
        res.status(500).send({msg: "Error listing sneakers", error: error.message});
    }
});

module.exports = router;