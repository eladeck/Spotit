const express = require("express");
const ObjectId = require('mongodb').ObjectId; 
const router = express.Router();
const bycrypt = require('bcryptjs');
//Bring in User Model
let userSchema = require('../models/userSchema');
let dbo = require('../../server');


// Register form
router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/getUser', (req, res) => {

    const userName = req.query.userName;
    console.log(userName)
    console.log(typeof userName)

    const usersCollection = req.app.locals.usersCollection;
    usersCollection.find({userName}).toArray(function(err, result) {
        if (err || result.length === 0) {
            res.send(401, {errMsg:'no such user name'});
        } else {
            res.send(result[0])
        }
    })
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
    })



}); // getImage

router.get('/login', (req, res) => {
    const userName = req.query.userName;
    const password = req.query.password;

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

    console.log("in users/post method: name is ");
    console.log(req.body);
    const newUser = JSON.parse(req.body)

    // completing the db schema:
    newUser.following = []
    newUser.followedBy = []
    newUser.images = []

    delete newUser.password2

    console.log(newUser)

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