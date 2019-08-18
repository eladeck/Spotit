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

  if(!req.file) {
    res.send({msg: "no file uploaded! please select file and then press upload"})
  }

    const desiredFileName = req.file.originalname//`${req.file.filename}.jpg`

    const tempPath = req.file.path;
    const userName = req.cookies.userName;

    const userDirectory = path.join(__dirname, `../images/${userName}`);
    const newImagePath = path.join(__dirname, `../images/${userName}/${desiredFileName}`);

    if (!fs.existsSync(userDirectory)) {
        fs.mkdirSync(userDirectory)
    }

    fs.rename(tempPath, newImagePath, function (err) {
      if (err) throw err;
      console.log('renamed complete');
      console.log(`tempPath is ${tempPath}`);
      console.log(`newImagePath is ${newImagePath}`);
    });



    // const imageObject = JSON.parse(req.body);
    // console.log(`--- inside upload. req.body is`)
    // console.log(req.body)
    // console.log(`---. req.file is`)
    // console.log(req.file)

    const objectToInsert = {
        userName,
        date: new Date(),
        url: desiredFileName, // this is like "llbg3.jpg". desiredFileName was not good here since it was "4das9r31uoijdas.jpg"
        airplaeModel: req.body.airplaneModel,
        airline: req.body.airline,
        country: req.body.country,
        city: req.body.city,
        airport: req.body.airport,
        code: req.body.registration
    };
    
    const imagesCollection = req.app.locals.imgCollection;
    imagesCollection.insertOne(objectToInsert, (err, result) => {
        if(err) {
          console.log("in imagesCollection.insertOne(): ERROR occured.")
          res.send(401, {errMsg:`Error occured while uploading image to database.`});
        } else {
          console.log("in imagesCollection.insertOne(): Object successfully inserted.")
          res.status(200).send(200, {msg:"successfully uploaded image"})
        }

        // adding the fresh image id to the user's images list (but maybe to delete the image list from user record?)
        let _id = result.ops[0]._id;
        // _id = ObjectId.valueOf(_id);
        // console.log(_id);

        req.app.locals.usersCollection.updateOne(
          { userName }, /*query: what record to update*/
          { $addToSet: { images: ObjectId(_id) } }
       );
    });
});

module.exports = router;