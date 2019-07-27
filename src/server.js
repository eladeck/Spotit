const express = require('express');
const path = require('path');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const user = require('./server/routes/user');
const password = '1234';
const mongoUrl = `mongodb+srv://DorBenLulu:${password}@spotit-bx5gf.mongodb.net/test?retryWrites=true`;

const bodyParser = require('body-parser');
app.use(bodyParser.text());

app.use(express.static("../public")) 

let userCollection = 4;
let dbo;

MongoClient.connect(mongoUrl, { useNewUrlParser: true }, (err, db) => {
    if (err) {console.log(`----------------${err}----------`); throw err};
    console.log('Connected successfully to database!');
    dbo = db.db("SpotItCollection");

    userCollection = dbo.collection('users');
    app.locals.userCollection = userCollection;
});

console.log(`app local finished`)
// MongoClient.connect(mongoUrl, { useNewUrlParser: true }, (err, db) => {
//     if (err) throw err;
//     console.log('Connected successfully to database!');
//     dbo = db.db("SpotItCollection");
// });

app.use('/user', user);

console.log(`nefore app.listen`)
const port = 3001;
app.listen(port, () => console.log(`started listening to port ${port}!`))

module.exports = MongoClient;
