const express = require("express");

//const ObjectId = require('mongodb').ObjectId; 

const router = express.Router();
//const bycrypt = require('bcryptjs');
//Bring in User Model
// let userSchema = require('../models/userSchema');
// let dbo = require('../../server');

router.get('/:airportName', (req, res) => {
    const airportName = req.params.airportName;
    airportName = airportName.replace('/', '-'); // so the name won't have slashes on it... need to upload to the server like that and send the request from the client like that. 
    console.log(`you juse requested airport!`)
    res.send({yay:"yay! " + airportName})
});


module.exports = router;