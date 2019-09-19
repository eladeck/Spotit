const express = require("express");
const router = express.Router();

router.get('/:airportName', (req, res) => {
    const airportName = req.params.airportName;
    airportName = airportName.replace('/', '-'); // so the name won't have slashes on it... need to upload to the server like that and send the request from the client like that. 
    console.log(`you juse requested airport!`)
    res.send({yay:"yay! " + airportName})
});


module.exports = router;