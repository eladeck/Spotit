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

    const desiredFileName = "picppicpicpic.jpg"

    const tempPath = req.file.path;
    console.log(`temPath is ${tempPath}`)

    const targetPath = path.join(__dirname, `../images/${desiredFileName}`);
    console.log(`targetPath is ${targetPath}`)

    fs.rename(tempPath, targetPath, function (err) {
        if (err) throw err;
        console.log('renamed complete');
      });



    // const imageObject = JSON.parse(req.body);
    console.log(`--- inside upload. req.body is`)
    console.log(req.body)
    console.log(`---. req.file is`)
    console.log(req.file)

    const objectToInsert = {
        user:'',
        date:'',
        url:desiredFileName,
        brand:'',
        model:'',
        company:'',
        country:'',
        city:'',
        airport:'',
        code:'',
    };

    // const imagesCollection = req.app.locals.imagesCollection;
    // imagesCollection.insertOne(objectToInsert, (err, res) => {
    //     if(err) {
    //     res.send(401, {errMsg:`Error occured while uploading image to database.`});
    //     } else {
    //         res.send({msg:"successfully uploaded image"})
    //     }
    // });
});

module.exports = router;

/*
user
:
"Elad Eckstein"
date
:
2019-09-05T21:00:00.000+00:00
url
:
"BAA380.jpg"
brand
:
"Airbus"
model
:
"A380-300"
company
:
"British Airways"
country
:
"United Kingdom"
city
:
"London"
airport
:
"Heathrow"
code
:
"LHR"
 */