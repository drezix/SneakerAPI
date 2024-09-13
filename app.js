const express = require('express')
const path = require('path')
const userRoutes = require('./routes/userRoutes');
const sneakerRoutes = require('./routes/sneakerRoutes');
const installRoute = require('./routes/installRoute');
const authRoute = require('./routes/authRoute');
const adminRoutes = require('./routes/adminRoute');
const storeRoutes = require('./routes/storeRoutes');
const orderRoutes = require('./routes/orderRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerAutogen = require('swagger-autogen')();

const app = express()
const port = 3000


//--------------------------------------------SWAGGER--------------------------------------------
const outputFile = './swagger_output.json';
const endpointsFiles = [
    './app.js',
    './routes/userRoutes.js',
    './routes/sneakerRoutes.js',
    './routes/installRoute.js',
    './routes/authRoute.js',
    './routes/adminRoute.js'
];

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


swaggerAutogen(outputFile, endpointsFiles).then(() => {
  const swaggerDocs = require('./swagger_output.json'); // Carrega o arquivo gerado
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

  // Iniciar o servidor após a geração da documentação
  app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
  });
});

require('./config/db');