const YAML = require('yamljs');
const path = require('path');
const { Server } = require('http');
const { url } = require('inspector');

// Load multiple YAML files 
const authSwaggerDocument = YAML.load(path.join(__dirname, './auth.yaml'));
const userSwaggerDocument = YAML.load(path.join(__dirname, './user.yaml'));
const adminSwaggerDocument = YAML.load(path.join(__dirname, './admin.yaml'));
const categorySwaggerDocument = YAML.load(path.join(__dirname, './category.yaml'));
const foodSwaggerDocument = YAML.load(path.join(__dirname, './food.yaml'));
const orderSwaggerDocument = YAML.load(path.join(__dirname, './order.yaml'));
const restaurantSwaggerDocument = YAML.load(path.join(__dirname, './restaurant.yaml'));

// Combine multiple Swagger YAML files
const swaggerDocument = {
openapi: '3.0.0',
  info: {
    title: 'Food API with JWT Authentication',
    description: 'This API provides endpoints for authentication, user management, and more.',
    version: '1.0.0',
  },
  servers: [
    {
      url: 'http://localhost:8080',
      description: 'Development server'
    },
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  paths: {
    ...authSwaggerDocument.paths,
    ...userSwaggerDocument.paths,
    ...adminSwaggerDocument.paths,
    ...categorySwaggerDocument.paths,
    ...foodSwaggerDocument.paths,
    ...orderSwaggerDocument.paths,
   // ...restaurantSwaggerDocument.paths,
  },
  
};

module.exports = swaggerDocument;
