require('dotenv').config();

const mongoose = require('mongoose');
const dbConnectString = process.env.MONGODB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/reportstore'
mongoose
  .connect(dbConnectString, { useNewUrlParser: true })
  .catch(e => {
      console.error('Connection Error: ', e.message)
  });

const db = mongoose.connection;

module.exports = db;