const express = require("express");
const ObjectId = require('mongodb').ObjectId; 
const router = express.Router();

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
}); // all

router.post(`/follow`, (req, res) => {
    const loggedInUserName = req.cookies.userName;
    const userNameToFollow = req.query.userNameToFollow;
    const usersCollection = req.app.locals.usersCollection;

     usersCollection.updateOne({ userName: userNameToFollow }, { $addToSet: { followedBy: loggedInUserName } }, () => {
         usersCollection.updateOne(
            { userName: loggedInUserName },
            { $addToSet: { following: userNameToFollow } },
            res.status(200).send({msg: `ok! ${loggedInUserName} now follows ${userNameToFollow}`})
         );
     });
}); // follow

router.post(`/unfollow`, async (req, res) => {
    const loggedInUserName = req.cookies.userName;
    const userNameToUnfollow = req.query.userNameToUnfollow;
    const usersCollection = req.app.locals.usersCollection;
     
    usersCollection.updateOne({ userName: userNameToUnfollow }, { $pull: { followedBy: loggedInUserName } }, () => {
        usersCollection.updateOne(
            { userName: loggedInUserName },
            { $pull: { following: userNameToUnfollow } },
            res.status(200).send({msg: `ok! ${loggedInUserName} unfollowed ${userNameToUnfollow}`})
         );
    });
}); // unfollow  

// Register form
router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/getUser', (req, res) => {
    const userName = req.query.userName;
    const usersCollection = req.app.locals.usersCollection;
    router.getUserFromDb(userName, usersCollection, res);
}); // getUser

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
    let flag = true;
    const images = [];

    usersCollection.find({"userName": userName}).toArray((err, result) => {
        if (err || result.length === 0) {
            console.log(`in router.get('/getImages'): There was no user found under the name '${userName}'`)
            res.send(401, {errMsg:`no userName ${userName}.`});
        } else {
            const user = result[0];
            console.log(`found user ${user.userName}`)

            if (user.images.length > 0) {
                user.images.forEach(imgId => {
                    imgCollection.find({"_id": ObjectId(imgId)}).toArray(function(err, result) {
                        if (err || result.length === 0) {
                            console.log(`in router.get('/getImages'): couldn't find the image with id=${imgId}`)
                            res.send(401, {errMsg:`no such img with ${imgId} id`});
                        } else {
                            images.push(result[0]);
    
                            if(images.length === user.images.length) {
                                res.send(images);
                                return;
                            }
                        }
                    }); 
                });

                flag = false;
            }
            
            if (flag) {
                res.send(images);
            } 
        }
    });
}); // getImages

const findFollowerPromise = (usersCollection, follower) => {
    return new Promise((resolve,reject) => {
        usersCollection.find({"userName": follower}).toArray((err, innerUser) => {
            if(err || innerUser.length === 0) {
                reject(err);
            } else {
                const userFollower = innerUser[0];
                const result = {userName: follower, profilePictureUrl: userFollower.profilePictureUrl};
                resolve(result);
            }
        });
    })
}

const callFindFollowersPromise = async (usersCollection, follower) => {
    const result = await findFollowerPromise(usersCollection, follower);              
    return result;
}

router.get('/getFollowersProfilePicture', (req, res) => {
    const userName = req.query.userName;
    const usersCollection = req.app.locals.usersCollection;
    let user = null;

    usersCollection.find({"userName": userName}).toArray((err, result) => {
        if (err || result.length === 0) {
            console.log(`in router.get('/getFollowersProfilePicture'): There was no user found under the name '${userName}'`)
            res.send(401, {errMsg:`no userName ${userName}.`});
        } else {
             user = result[0];
            console.log(`in router.get('/getFollowersProfilePicture'): found user ${user.userName}`);
        }

        let followingProfilePicture =[];
        let followedByProfilePicture = [];

        if(user.following.length === 0 && user.followedBy.length === 0) {
            const allProfilePictures = {followedByProfilePicture, followingProfilePicture};
            res.send(allProfilePictures);
            return;
        } 
        
        user.following.forEach(follower => {

            callFindFollowersPromise(usersCollection, follower).then(obj => {
                followingProfilePicture.push(obj);

                if (followedByProfilePicture.length == user.followedBy.length && followingProfilePicture.length == user.following.length) {
                    const allProfilePictures = {followedByProfilePicture, followingProfilePicture};
                    res.send(allProfilePictures);
                }
            });
        });

        user.followedBy.forEach(follower => {

            callFindFollowersPromise(usersCollection, follower).then(obj => {
                followedByProfilePicture.push(obj);

                if (followedByProfilePicture.length == user.followedBy.length && followingProfilePicture.length == user.following.length) {
                    const allProfilePictures = {followedByProfilePicture, followingProfilePicture};
                    res.send(allProfilePictures);
                }
            });
        });
    });

}); // getFollowersProfilePicture


router.get('/login', (req, res) => {
    const userName = req.query.userName;
    const password = req.query.password;
    console.log(`user.js: in router.get('/login'): userName is ${userName} and password is ${password}`)
    res.cookie('userName', userName, {expires: new Date(2020, 1, 1)});

    // search the user in Db
    var query = {userName, password}

    const usersCollection = req.app.locals.usersCollection;
    usersCollection.find(query).toArray(function(err, result) {
        if (err || result.length === 0) {
            res.send(401, {errMsg:'wrong username or password'});
        } else {
            res.send(result[0])
        }
    });
}); // login

router.get('/logout', (req, res) => {
    const userNameToLougOut = req.cookies.userName;
    res.clearCookie('userName');
    return res.status(200).redirect('/login');
}); // logout

router.post('/addNewUser', (req, res) => {
    const newUser = JSON.parse(req.body)

    // completing the db schema:
    newUser.following = []
    newUser.followedBy = []
    newUser.images = []
    newUser.profilePictureUrl = '/default-profile-picture.png';
    newUser.reportPermission = false;
    delete newUser.password2;
    
    res.cookie('userName', newUser.userName, {expires: new Date(2020, 1, 1)});

    const usersCollection = req.app.locals.usersCollection;
    usersCollection.insertOne(newUser, function(err, dbResult) {
        if (err) throw err;
        console.log("router.post('/addNewUser'): result is", dbResult.ops[0]);
        res.send(dbResult.ops[0]) // automatically send status 200
        // db.close();
      });
}); // addNewUser

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/profile/:userName', (req, res) => {
    const userName = req.params.userName;
    const query = {userName}
    const usersCollection = req.app.locals.usersCollection;
    usersCollection.find(query).toArray((err, result) => {
        if (err || result.length === 0) {
            res.send(401, {errMsg:'wrong username'});
        } else {
            res.send(result[0])
        }
    })
});

router.post('/specialReport', (req, res) => {
    let newReport = JSON.parse(req.body);
    const reportCollection = req.app.locals.specialReport;

    reportCollection.insertOne(newReport, (err, DbResult) => {
        if (err) throw err;
        res.send('<div style="position:fixed;left:40%;top:40%;font-family:fantasy;letter-spacing:1px;word-spacing:2px;">' +
        'Thank you for report and contribute to the community. go back to <a href="/">home page</a></div>')
      });
}); // specialReport

module.exports = router;