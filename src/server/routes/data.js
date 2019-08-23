const express = require("express");
const router = express.Router();


router.get('/flights', (req, res) => {

    console.log("in router.get(flights):");
    const goSpotItInfo = req.app.locals.goSpotItInfo;
    goSpotItInfo.find({}).toArray(function(err, result) {
        if (err || result.length === 0) {
            res.send(401, {errMsg:`error fetching all flight data`});
        } else {
            res.send(result) 
        }
    });
});

// resposnes with all users in db
router.get('/all', (req, res) => {
    const usersCollection = req.app.locals.usersCollection;
    usersCollection.find({}).toArray(function(err, result) {
        if (err || result.length === 0) {
            res.send(401, {errMsg:`error fetching all users`});
        } else {
            res.send(result) 
        }
    });
});
module.exports = router;