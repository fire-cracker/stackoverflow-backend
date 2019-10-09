require('dotenv').config();

module.exports = {
  development: {
    url: process.env.DATABASE_URL_DEV,
    dialect: 'mysql',
    logging: false,
  },
  test: {
    url: process.env.DATABASE_URL_TEST,
    dialect: 'mongoDB',
    logging: false,
  },
  production: {
    url:process.env.MONGODB_URI,
    dialect: 'mysql',
    logging: false,
  },
};
