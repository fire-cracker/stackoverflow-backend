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
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
  },
};
