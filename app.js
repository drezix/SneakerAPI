const express = require('express')
const path = require('path')
const { saveUser, updateUser, removeUser, listUser, getUserID } = require('./models/userModel');
const { saveSneaker, updateSneaker, removeSneaker, listSneaker } = require('./models/sneakerModel');

const app = express()
const port = 3000

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//--------------------------------------------USER--------------------------------------------

app.post('/user', async (req, res) => {
  const {username, password, isAdmin} = req.body;
  try {
    const newUser = await saveUser(username, password, isAdmin);
    res.status(201).json({user: newUser});
  } catch (error) {
    res.status(500).send({msg: "Error saving user", error: error.message});
  }
});

app.put('/user/:id', async (req, res) => {
  const {id} = req.params;
  const {username} = req.body;
  try {
    const updatedUser = await updateUser(id, username);
    res.status(200).json({user: updatedUser});
  } catch (error) {
    res.status(500).send({msg: "Error updating user", error: error.message});
  }
});

app.delete('/user/:id', async (req, res) => {
  const {id} = req.params;
  try {
    const removedUser = await removeUser(id);
    res.status(200).json({user: removedUser});
    console.log('User removed');
  } catch (error) {
    res.status(500).send({msg: "Error removing user", error: error.message});
  }
});

app.get('/user', async (req, res) => {
  try {
    const users = await listUser();
    res.status(200).json({users});
  } catch (error) {
    res.status(500).send({msg: "Error listing users", error: error.message});
  }
});

app.get('/user/:id', async (req,res) => {
  const {id} = req.params;
  try{
    const user = await getUserID(id);
    res.status(200).json({user});
  } catch {
    res.status(500).send({msg: "Error getting user by ID", error: error.message});
  }
});

//--------------------------------------------SNEAKER--------------------------------------------

app.post('/sneaker', async (req, res) => {
  const {name, price, size, brand} = req.body;
  try {
    const newSneaker = await saveSneaker(name, price, size, brand);
    res.status(201).json({user: newSneaker});
  } catch (error) {
    res.status(500).send({msg: "Error saving user", error: error.message});
  }
});

app.put('/sneaker/:id', async (req, res) => {
  const {id} = req.params;
  const {name, price, size, brand} = req.body;
  try {
    const updatedSneaker = await updateSneaker(id, name, price, size, brand);
    res.status(200).json({user: updatedSneaker});
  } catch (error) {
    res.status(500).send({msg: "Error updating user", error: error.message});
  }
});

app.delete('/sneaker/:id', async (req, res) => {
  const {id} = req.params;
  try {
    const removedSneaker = await removeSneaker(id);
    res.status(200).json({user: removedSneaker});
    console.log('Sneaker removed');
  } catch (error) {
    res.status(500).send({msg: "Error removing sneaker", error: error.message});
  }
});

app.get('/sneaker', async (req, res) => {
  try {
    const sneakers = await listSneaker();
    res.status(200).json({sneakers});
  } catch (error) {
    res.status(500).send({msg: "Error listing sneakers", error: error.message});
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

require('./config/db');