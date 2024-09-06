const express = require('express')
const path = require('path')
const userRoutes = require('./routes/userRoutes');
const sneakerRoutes = require('./routes/sneakerRoutes');
const installRoute = require('./routes/installRoute');
const authRoute = require('./routes/authRoute');
const adminRoutes = require('./routes/adminRoute');

const app = express()
const port = 3000

app.use(express.json());

//--------------------------------------------AUTH-----------------------------------------------
app.use('/auth', authRoute);

//--------------------------------------------ADMIN----------------------------------------------
app.use('/admin', adminRoutes);

//--------------------------------------------USER-----------------------------------------------
app.use('/user', userRoutes);

//--------------------------------------------SNEAKER--------------------------------------------
app.use('/sneaker', sneakerRoutes);

//--------------------------------------------INSTALL--------------------------------------------
app.use('/install', installRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

require('./config/db');