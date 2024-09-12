const express = require('express')
const path = require('path')
const userRoutes = require('./routes/userRoutes');
const sneakerRoutes = require('./routes/sneakerRoutes');
const installRoute = require('./routes/installRoute');
const authRoute = require('./routes/authRoute');
const adminRoutes = require('./routes/adminRoute');
const storeRoutes = require('./routes/storeRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express()
const port = 3000

app.use(express.json());

//--------------------------------------------AUTH-----------------------------------------------
app.use('/auth', authRoute);

//--------------------------------------------ADMIN----------------------------------------------
app.use('/admin', adminRoutes);

//--------------------------------------------USER-----------------------------------------------
app.use('/user', userRoutes);

//--------------------------------------------STORE----------------------------------------------
app.use('/store', storeRoutes);

//--------------------------------------------SNEAKER--------------------------------------------
app.use('/sneaker', sneakerRoutes);

//--------------------------------------------ORDER----------------------------------------------
app.use('/order', orderRoutes);

//--------------------------------------------INSTALL--------------------------------------------
app.use('/install', installRoute);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

require('./config/db');