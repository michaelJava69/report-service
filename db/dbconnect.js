require('dotenv').config();

const mongoose = require('mongoose');
const dbConnectString = process.env.MONGODB_CONNECTION_STRING || 'mongodb://mongo:27017/reportstore'

// to work on local machine n ot using docker-compose
//const dbConnectString = process.env.MONGODB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/reportstore'


function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}

wait(9000);


mongoose
  .connect(dbConnectString, { useNewUrlParser: true })
  .catch(e => {
      console.error('Connection Error: after waited 9 seconds will try again after 9 secs  ', e.message)
  });


wait(9000);


mongoose
  .connect(dbConnectString, { useNewUrlParser: true })
  .catch(e => {
      console.error('Connection Error: ', e.message)
  });



const db = mongoose.connection;

module.exports = db;
