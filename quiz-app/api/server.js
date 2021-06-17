const express = require('express');
const app = express();
//const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const routes = require('./routes'); //includes the routing
const cors = require('cors'); //includes cors module
const bodyParser = require('body-parser');

require('dotenv').config({path: './.env'});

app.use(cors()); //tells server to use CORS
app.use(express.json()); // tells server to use json
app.use(routes); // tells server to use touring



mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Database connected!'));
const port = 8000;

app.listen(process.env.PORT, () => {console.log('Alive and well in Port ' + port);});