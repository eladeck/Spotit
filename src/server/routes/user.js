const express = require("express");
const ObjectId = require('mongodb').ObjectId; 
const router = express.Router();
const bycrypt = require('bcryptjs');
//Bring in User Model
let userSchema = require('../models/userSchema');
let dbo = require('../../server');

router.getUserFromDb = (userName, usersCollection, res) => {
    usersCollection.find({userName}).toArray(function(err, result) {
        if (err || result.length === 0) {
            console.log(`result is`)
            console.log(result)
            res.status(401).send({errMsg:`no such user name as ${userName}`});
        } else {
            res.send(result[0])
        }
    })
}

router.get('/profile/:userName', (req, res) => {
    const userName = req.params.userName;
    console.log(`in profile of ${userName}`)
    res.send({msg: `in ${userName} profile`})
});

router.post(`/follow`, (req, res) => {
    // console.log(req.query)
    const loggedInUserName = req.cookies.userName;
    const {userNameToFollow} = req.query;
    const usersCollection = req.app.locals.usersCollection;
    console.log(`${loggedInUserName} wanna follow ${userNameToFollow}`)

    usersCollection.updateOne(
        { userName: loggedInUserName },
        { $addToSet: { following: userNameToFollow } }
     );

     usersCollection.updateOne(
        { userName: userNameToFollow },
        { $addToSet: { followedBy: loggedInUserName } }
     );

     res.status(200).send({msg: `ok! ${loggedInUserName} now follows ${userNameToFollow}`});
});

// Register form
router.get('/register', (req, res) => {


    // const userId = Math.floor(Math.random() * 900000) + 100000; //some random number
    // res.cookie('user_id', userId, {expires: new Date(2020, 1, 1)});
    // res.send("you are signed up with the user id: " + userId + ". go back <a href='/'>HOME</a>")


    res.render('register');
});

router.get('/getUser', (req, res) => {
    const userName = req.query.userName;
    const usersCollection = req.app.locals.usersCollection;
    router.getUserFromDb(userName, usersCollection, res);
});

router.get('/getImage', (req, res) => {

    const imgId = req.query.imgId;

    const imgCollection = req.app.locals.imgCollection;
    imgCollection.find({"_id": ObjectId(imgId)}).toArray(function(err, result) {
        if (err || result.length === 0) {
            res.send(401, {errMsg:`no such img with ${imgId} id`});
        } else {
            res.send(result[0]) // result[0] because it's an array
        }
    });
}); // getImage

// Same like "/getImage", just this route, brings all the user's images in one time.
router.get('/getImages', (req, res) => {

    const userName = req.query.userName;
    const imgCollection = req.app.locals.imgCollection;
    const usersCollection = req.app.locals.usersCollection;

    const images = [];
    usersCollection.find({"userName": userName}).toArray((err, result) => {
        if (err || result.length === 0) {
            res.send(401, {errMsg:`no userName ${userName}.`});
        } else {
            const user = result[0];

            user.images.forEach(imgId => {
                console.log('--------------------')
                console.log(images)
                console.log(imgId)
                imgCollection.find({"_id": ObjectId(imgId)}).toArray(function(err, result) {
                    if (err || result.length === 0) {
                        res.send(401, {errMsg:`no such img with ${imgId} id`});
                    } else {
                        images.push(result[0]);

                        if(images.length === user.images.length) {
                            res.send(images);
                        }

                    }
                });
            });

            // console.log("images array is: ")
            // console.log(images);
            // res.send(images);
        }
    });
}); // getImage

router.get('/login', (req, res) => {
    const userName = req.query.userName;
    const password = req.query.password;

    res.cookie('userName', userName, {expires: new Date(2020, 1, 1)});

    // console.log(userName)
    // console.log(password)
    // console.log(typeof userName)
    // console.log(typeof password)

    // search the user in Db
    var query = {userName, password}

    const usersCollection = req.app.locals.usersCollection;
    usersCollection.find(query).toArray(function(err, result) {
        if (err || result.length === 0) {
            res.send(401, {errMsg:'wrong username or password'});
        } else {
            res.send(result[0])
        }
    })
}); // login



router.post('/addNewUser', (req, res) => {

    const newUser = JSON.parse(req.body)

    // completing the db schema:
    newUser.following = []
    newUser.followedBy = []
    newUser.images = []
    
    delete newUser.password2
    
    res.cookie('userName', newUser.userName, {expires: new Date(2020, 1, 1)});

    // const name = newUser.name;
    // const email = newUser.email;
    // const userName = newUser.userName;
    // const password = newUser.password;
    // const password2 = newUser.password2;

    // req.checkBody('name', 'Name is required').notEmpty();
    // req.checkBody('email', 'Email is required').notEmpty();
    // req.checkBody('email', 'Email is not valid').isEmail();
    // req.checkBody('userName', 'User name is required').notEmpty();
    // req.checkBody('password', 'Password is required').notEmpty();
    // req.checkBody('password2', 'Passwords do not match').equals(password);
    
    const usersCollection = req.app.locals.usersCollection;
    usersCollection.insertOne(newUser, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        // db.close();
      });

    res.send(newUser[0]) // automatically send status 200
});

router.get('/login', (req, res) => {
    res.render('login');
});

module.exports = router;