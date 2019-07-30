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
app.use(express.static("./")) // for fetching images! because client knows the path to the images ./server/images/BAA380.jpg

let dbo;

MongoClient.connect(mongoUrl, { useNewUrlParser: true }, (err, db) => {
    if (err) {console.log(`----------------${err}----------`); throw err};
    console.log('Connected successfully to database!');
    dbo = db.db("SpotItCollection");

    app.locals.usersCollection = dbo.collection('users');
    app.locals.imgCollection = dbo.collection('images');
});

console.log(`app local finished`)
// MongoClient.connect(mongoUrl, { useNewUrlParser: true }, (err, db) => {
//     if (err) throw err;
//     console.log('Connected successfully to database!');
//     dbo = db.db("SpotItCollection");
// });

app.use('/user', user);

console.log(`nefore app.listen`)
const port = 3002;
app.listen(port, () => console.log(`started listening to port ${port}!`))

module.exports = MongoClient;
