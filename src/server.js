const express = require('express');
const path = require('path');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const user = require('./server/routes/user');
const image = require('./server/routes/image');

const airport = require('./server/routes/airport');


const data = require('./server/routes/data');
const cookieParser = require('cookie-parser');
const password = '1234';
const mongoUrl = `mongodb+srv://DorBenLulu:${password}@spotit-bx5gf.mongodb.net/test?retryWrites=true`;
const bodyParser = require('body-parser');

app.use(bodyParser.text()); 
app.use(cookieParser());
app.use(express.static("../public")) 
app.use(express.static("./server/images")) // for fetching images! because client knows the path to the images ./server/images/BAA380.jpg

let dbo;

const port = process.env.PORT || 3002;
app.listen(port, () => console.log(`started listening to port ${port}!`))

async function startServer() {
    console.log(`starting the db...`)
    const db = await MongoClient.connect(mongoUrl, { useNewUrlParser: true });
    dbo = db.db("SpotItCollection");
    console.log('Connected successfully to database!');
    app.locals.usersCollection = dbo.collection('users');
    app.locals.imgCollection = dbo.collection('images');
    app.locals.airlines = dbo.collection('airlines');
    app.locals.aircrafts = dbo.collection('aircrafts');
    app.locals.countries = dbo.collection('countries');
    app.locals.cities = dbo.collection('cities');
    app.locals.airports = dbo.collection('airports');
    app.locals.cities = dbo.collection('cities');
    app.locals.specialReport = dbo.collection('specialReports');
    app.locals.goSpotItInfo = dbo.collection('goSpotItInfo');

    app.use('/user', user);
    app.use('/image', image);
    app.use('/airport', airport);
    app.use('/data', data);

    // all server code goes here and it'll happen only when db is up
    app.get('/profile/:someUserName/:someImageUrl', (req, res) => { 
        const imgUrl = req.params.someImageUrl;
        const userName = req.params.someUserName;
    
        // in the future we should get all these pics from the user folder
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
                collection.find({}).limit(1000).toArray((err, result) => { // limit to only 10
                    err ? reject(err) : resolve(result);
                })});
        }
    
        const callCollectionPromise = async () => {

            let [airlines1, aircrafts1, countries1, cities1, airports1] =
                await Promise.all([
                    collectionPromise(airlines),
                    collectionPromise(aircrafts),
                    collectionPromise(countries),
                    collectionPromise(cities),
                    collectionPromise(airports)])

            imageFormData.airlines  = airlines1;
            imageFormData.aircrafts = aircrafts1;
            imageFormData.countries = countries1;
            imageFormData.cities    = cities1;
            imageFormData.airports  = airports1;
        
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

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname + "/../public/index.html"))
    })
} // startServer

startServer();

module.exports = MongoClient;
