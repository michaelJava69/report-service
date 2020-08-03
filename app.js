require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const apiPort = process.env.APP_PORT || 3000;

const db = require('./db/dbconnect');
const reportRouter = require('./routes/report-router');

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(cors());
app.use(bodyParser.json({ limit: '50mb', extended: true, parameterLimit: 50000 }));

db.on('error', console.error.bind(console, 'MongoDB connection error: '));

app.get('/', (req,res) => {
    res.send('Hello World');
})

app.use('/api', reportRouter);

app.listen(apiPort, () => console.log('Server started on port ' + apiPort));