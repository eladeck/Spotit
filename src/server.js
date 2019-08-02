const express = require('express');
const path = require('path');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const user = require('./server/routes/user');
const cookieParser = require('cookie-parser');
const password = '1234';
const mongoUrl = `mongodb+srv://DorBenLulu:${password}@spotit-bx5gf.mongodb.net/test?retryWrites=true`;

const bodyParser = require('body-parser');
app.use(bodyParser.text());
app.use(cookieParser());
app.use(express.static("../public")) 
app.use(express.static("./server/images")) // for fetching images! because client knows the path to the images ./server/images/BAA380.jpg

let dbo;

MongoClient.connect(mongoUrl, { useNewUrlParser: true }, (err, db) => {
    if (err) {console.log(`----------------${err}----------`); throw err};
    console.log('Connected successfully to database!');
    dbo = db.db("SpotItCollection");
    
    app.locals.usersCollection = dbo.collection('users');
    app.locals.imgCollection = dbo.collection('images');
});

app.get('/home', (req, res) => {
    const userName = req.cookies.userName;
    console.log(`in server.js: app.get('/home'):`);
    if(userName) {
        // Load user from database.
        console.log(`in server.js: app.get('/home'): inside if`);
        user.getUserFromDb(userName, app.locals.usersCollection, res); // No need to add "res.send()" as getUsersFromDb does it already.
    } else {
        console.log(`in server.js: app.get('/home'): inside else`);
        res.send({notLoggedInMessage:"No user logged in."})
    }
});
app.use('/user', user);
const port = 3002;
app.listen(port, () => console.log(`started listening to port ${port}!`))
module.exports = MongoClient;

/*
app.get('/signup', function(req,res) {
    const userId = Math.floor(Math.random() * 900000) + 100000; //some random number
    res.cookie('user_id', userId, {expires: new Date(2020, 1, 1)});
    res.send("you are signed up with the user id: " + userId + ". go back <a href='/'>HOME</a>")
})

app.get('/logout', function (req, res) {
    res.clearCookie('user_id');
    res.redirect('/');
    res.end();
});
*/