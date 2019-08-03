const express = require("express");
const multer = require("multer");
const ObjectId = require('mongodb').ObjectId; 
const router = express.Router();
const dest = "./server/images";
const fs = require("fs");
const path = require("path");

const upload = multer({
    dest: dest
    // you might also want to set some limits: https://github.com/expressjs/multer#limits
  });

router.post('/upload', (req, res, next) => {console.log('in image upload!'); next()},
upload.single("image" /* name attribute of <file> element in your form */),
 (req, res) => {

    const desiredFileName = `${req.file.filename}.jpg`

    const tempPath = req.file.path;
    const userName = req.cookies.userName;

    console.log(`temPath is ${tempPath}`)
    const userDirectory = path.join(__dirname, `../images/${userName}`);
    const newImagePath = path.join(__dirname, `../images/${userName}/${desiredFileName}`);
    console.log(`userDirectory is ${userDirectory}`)

    if (!fs.existsSync(userDirectory)) {
        fs.mkdirSync(userDirectory)
        console.log(`created directory successfully`)
    }

    fs.rename(tempPath, newImagePath, function (err) {
      if (err) throw err;
      console.log('renamed complete');
    });



    // const imageObject = JSON.parse(req.body);
    console.log(`--- inside upload. req.body is`)
    console.log(req.body)
    console.log(`---. req.file is`)
    console.log(req.file)

    const objectToInsert = {
        user: userName,
        date: new Date(),
        url: desiredFileName,
        airplaeModel: req.body.airplaneModel,
        airline: req.body.airline,
        country: req.body.country,
        city: req.body.city,
        airport: req.body.airport,
        code: req.body.registration
    };
    
    console.log(`objet to insert is :`)
    console.log(objectToInsert);
    const imagesCollection = req.app.locals.imgCollection;
    imagesCollection.insertOne(objectToInsert, (err, result) => {
        if(err) {
          console.log("in imagesCollection.insertOne(): ERROR occured.")
          res.send(401, {errMsg:`Error occured while uploading image to database.`});
        } else {
          console.log("in imagesCollection.insertOne(): Object successfully inserted.")
          res.send({msg:"successfully uploaded image"})
        }
    });
});

module.exports = router;