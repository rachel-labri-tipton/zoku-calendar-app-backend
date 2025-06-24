require('dotenv').config();

module.exports = {
  development: {
    url: process.env.DEVELOPMENT_DATABASE_URL,
    dialect: 'postgres',
    dialectOptions: {
      ssl: false
    }
  },
  production: {
    url: process.env.PRODUCTION_DATABASE_URL,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
};
