import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CurrencyMomo API',
      version: '1.0.0',
      description: 'Personal finance management API'
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  apis: ['./src/modules/**/*.routes.ts']
};

export const swaggerSpec = swaggerJsdoc(options);