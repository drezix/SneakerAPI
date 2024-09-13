const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Sneaker API',
        description: 'API para gerenciamento de sneakers',
    },
    host: 'localhost:3000',
    schemes: ['http'],
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./app.js']; // Caminho para o arquivo principal das rotas

swaggerAutogen(outputFile, endpointsFiles, doc);