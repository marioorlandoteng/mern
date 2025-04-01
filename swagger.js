const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MERN Backend',
      version: '1.0.0',
      description: 'Simple MERN backend API',
    },
    servers: [
      {
        url: 'https://mern-be-smoky.vercel.app',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
