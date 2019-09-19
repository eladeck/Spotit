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

  router.post('/updateProfilePicture', (req, res, next) => {console.log('in image upload!'); next()}, 
  upload.single("image" /* name attribute of <file> element in your form */),
  (req, res) => {
    if(!req.file) {
      res.send({err: "no file uploaded! please select file and then press upload"})
    }

    console.log("In router.post('/updateProfilePicture): going to upload profile picture ")

    const imageName = req.file.originalname;
    const usersCollection = req.app.locals.usersCollection;
    const userToFind = {userName: req.cookies.userName};
    const newProfilePictureUrl = {$set: {profilePictureUrl: `${req.cookies.userName}/${imageName}`}}

    usersCollection.updateOne(userToFind, newProfilePictureUrl, (err, collectionResult) => {
      if (err) throw err;
      console.log("Profile picture was updated.");
      uploadImage(req, res);
      res.send('<div style="position:fixed;left:40%;top:40%;font-family:fantasy;letter-spacing:1px;word-spacing:2px;">' +
              'image uploaded! go back to <a href="/">home page</a></div>');
    });

  }
  );
  
  const uploadImage = (req, res) => {

    const imageName = req.file.originalname //`${req.file.filename}.jpg 
    console.log("uploadImage imageName is", imageName);   
    const tempPath = req.file.path;
    const userName = req.cookies.userName;

    const userDirectory = path.join(__dirname, `../images/${userName}`);
    const newImagePath = path.join(__dirname, `../images/${userName}/${imageName}`);

    if (!fs.existsSync(userDirectory)) {// If user's folder does not exist, create it.
        fs.mkdirSync(userDirectory)
    }

    fs.rename(tempPath, newImagePath, function (err) {
      if (err) throw err;
    });
  }

router.post('/upload', (req, res, next) => {console.log('in image upload!'); next()},
upload.single("image" /* name attribute of <file> element in your form */),
 (req, res) => {

  if(!req.file) {
    res.send({err: "no file uploaded! please select file and then press upload"})
  }

  uploadImage(req, res);

     const desiredFileName = req.file.originalname//`${req.file.filename}.jpg`


    const userName = req.cookies.userName;
    const objectToInsert = {
        userName,
        date: new Date(),
        url: desiredFileName, // this is like "llbg3.jpg". desiredFileName was not good here since it was "4das9r31uoijdas.jpg"
        airplaeModel: req.body.airplaneModel,
        airline: req.body.airline,
        country: req.body.country,
        city: req.body.city,
        airport: req.body.airport,
        code: req.body.registration,
        description: req.body.description,
        likes: [],
        comments: []
    };
    
    const imagesCollection = req.app.locals.imgCollection;
    

    imagesCollection.insertOne(objectToInsert, (err, result) => { 
        if(err) {
          console.log("in imagesCollection.insertOne(): ERROR occured.")
          res.send(401, {err:`Error occured while uploading image to database.`});
        } else {
          console.log("in imagesCollection.insertOne(): Object successfully inserted.")
          req.app.locals.usersCollection.updateOne(
            { userName }, /*query: what record to update*/
            { $addToSet: { images: ObjectId(result.ops[0]._id) } }, 
            res.send('<div style="position:fixed;left:40%;top:40%;font-family:fantasy;letter-spacing:1px;word-spacing:2px;">' +
              'image uploaded! go back to <a href="/">home page</a></div>'));
        }
    });
});





router.post('/newComment', (req, res) => {
  let id = req.query.id;
  let comment = JSON.parse(req.body)

  req.app.locals.imgCollection.updateOne(
    { _id: ObjectId(id) },
    { $addToSet: { comments: comment } }, function (err, result) {
      if (err) throw err;
      res.sendStatus(200);
      }
   )
});

router.get('/delete', (req, res) => {

  const id = req.query.id;
  const imgOwner = req.query.imgOwner;
  const imgUrl = req.query.imgUrl;


  // remove from user collection that owns that image
  req.app.locals.imgCollection.remove(
    {_id:ObjectId(id) }
 )

  // remove from img collection
  req.app.locals.usersCollection.updateOne(
    {userName: imgOwner},
    { $pull: { images: ObjectId(id) } },
    { multi: true }, () => {
      const pathToRemove = path.join(__dirname, `../images/${imgOwner}/${imgUrl}`);
      try {
       fs.unlinkSync(pathToRemove)
        res.sendStatus(200);
     } catch(err) {
       res.sendStatus(401);
     } // catch
    } // inline method
) // updateOne
});


router.get('/like', (req, res) => {
    const id = req.query.id;
    const happyUserName = req.query.happyUserName;

    const userNameWhoPressedLike = req.cookies.userName;

    req.app.locals.imgCollection.updateOne(
      { _id: ObjectId(id) },
      { $addToSet: { likes: userNameWhoPressedLike } }, function (err, result) {
        if (err) throw err;
        }
     )

     req.app.locals.usersCollection.updateOne(
      { userName: happyUserName },
      { $inc: { score: 1 } }, function (err, result) {
        if (err) throw err;
        res.status(200).send({"yay":"yay"});
        console.log(result);}
     )
        // res.send is inside updateOne user!
});


router.get('/recentImages', (req, res) => {

  const imageCollection = req.app.locals.imgCollection;

  imageCollection.find().limit(12).toArray(function(err, result) {
    if (err || result.length === 0) {
        res.send(401, {errMsg:'No images were found'});
    } else {
        res.send(result)
    }
})

})

module.exports = router;