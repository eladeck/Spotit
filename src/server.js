const express = require('express');
const path = require('path');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const user = require('./server/routes/user');
const image = require('./server/routes/image');
const airport = require('./server/routes/airport');
const cookieParser = require('cookie-parser');
const password = '1234';
const mongoUrl = `mongodb+srv://DorBenLulu:${password}@spotit-bx5gf.mongodb.net/test?retryWrites=true`;
const bodyParser = require('body-parser');

let isConnectedToMongoDb = false;

app.use(bodyParser.text());
app.use(cookieParser());
app.use(express.static("../public")) 
app.use(express.static("./server/images")) // for fetching images! because client knows the path to the images ./server/images/BAA380.jpg

let dbo;

MongoClient.connect(mongoUrl, { useNewUrlParser: true }, (err, db) => {
    if (err) {console.log(`----------------${err}----------`); throw err};
    console.log('Connected successfully to database!');
    isConnectedToMongoDb = true;
    dbo = db.db("SpotItCollection");
    
    app.locals.usersCollection = dbo.collection('users');
    app.locals.imgCollection = dbo.collection('images');
    app.locals.airlines = dbo.collection('airlines');
    app.locals.aircrafts = dbo.collection('aircrafts');
    app.locals.countries = dbo.collection('countries');
    app.locals.cities = dbo.collection('cities');
    app.locals.airports = dbo.collection('airports');
    app.locals.cities = dbo.collection('cities');
    app.locals.specialReport = dbo.collection('specialReports');
});

// should fix it, it is not good practice, just wanted to work it
// but I noticed when browser gets the pictures, it ask the path of /profile
// rather than user/profile.
// or maybe we should just create a route here 'profile'?
app.get('/profile/:someUserName/:someImageUrl', (req, res) => { 
    const imgUrl = req.params.someImageUrl;
    const userName = req.params.someUserName;

    // in the future we should get all these pics from the user folder
    // res.sendfile( __dirname + `/server/images/${req.cookies.userName}/${url}`);
    console.log(__dirname + `/server/images/${userName}/${imgUrl}`);
    res.sendfile( __dirname + `/server/images/${userName}/${imgUrl}`);
});

app.get('/home', (req, res) => {
    const userName = req.cookies.userName;
    if(userName) {
        // Load user from database.
        user.getUserFromDb(userName, app.locals.usersCollection, res); // No need to add "res.send()" as getUsersFromDb does it already.
    } else {
        res.send({notLoggedInMessage:"No user logged in."})
    }
});

app.get('/imageFormData', async (req, res) => {
    let imageFormData = {
    };
    const airlines = req.app.locals.airlines;
    const aircrafts = req.app.locals.aircrafts;
    const countries = req.app.locals.countries;
    const cities = req.app.locals.cities;
    const airports = req.app.locals.airports;
    
    const collectionPromise = (collection) => {
        return new Promise((resolve, reject) => {
            collection.find({}).limit(10).toArray((err, result) => { // limit to only 10
                err ? reject(err) : resolve(result);
            })});
    }

    const callCollectionPromise = async () => {
        imageFormData.airlines = await (collectionPromise(airlines));
        imageFormData.aircrafts = await (collectionPromise(aircrafts));
        imageFormData.countries = await (collectionPromise(countries));
        imageFormData.cities = await (collectionPromise(cities));
        imageFormData.airports = await (collectionPromise(airports));
        return imageFormData;
    }

    callCollectionPromise()
    .then(result => {
        res.send(result);
    })
    .catch(err => {
        console.log(err);
        res.send(401, {errMsg:`Error occured while fetching data from database.`});
    });
});

app.use('/user', user);
app.use('/image', image);
app.use('/airport', airport);


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

app.get('*', (req, res) => {
    console.log(`------`)
    console.log(`iv'e got a route for ${req.protocol + '://' + req.get('host') + req.originalUrl} but don't have it`)
    console.log(`------`)
    res.sendFile(path.join(__dirname + "/../public/index.html"))
})