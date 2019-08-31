const express = require("express");
const router = express.Router();

const getCollection = (collectionName, req) => {
    switch (collectionName) {
        case 'users':
            return req.app.locals.usersCollection;
            break;
        case 'images':
            return req.app.locals.imgCollection;
            break;
        case 'airlines':
            return req.app.locals.airlines;
            break;

        case 'aircrafts':
            return req.app.locals.aircrafts;
            break;
        case 'countries':
            return req.app.locals.countries;
            break;
        case 'cities':
                return req.app.locals.cities;
                break;
        case 'airports':
            return req.app.locals.airports;
            break;
        case 'specialReports':
                return req.app.locals.specialReports;
                break;
        case 'goSpotItInfo':
            return req.app.locals.goSpotItInfo;
            break;
        default:
            return null;
    }
}
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

// Try to make the request fit general requests.
// It should handle requests for: airports, aircrafts, airlines etc.
router.get('/general/:fieldName/:fieldValue', (req, res) => { // (26.08.2019): NOT COMPLETED YET!
    
    const fieldName = req.params.fieldName;
    const fieldValue = req.params.fieldValue;
    const collection = req.app.locals.imgCollection;
    console.log("In router.get('/general/:fieldName/:fieldValue'): fieldName and fieldValue are:")
    console.log(fieldName);
    console.log(fieldValue);
    
    query = {"airport": fieldValue};

    collection.find(query).toArray(function(err, result) {
        if (err || result.length === 0) {
            res.send(401, {errMsg:`error fetching all images for info page`});
        } else {
            res.status(200).send(result) 
        }
    });
});

module.exports = router;