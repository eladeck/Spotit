import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
// import Link from '@material-ui/core/Link';
import { Link } from 'react-router-dom'
import ProductHero from './ProductHero'
import PopupModal from './PopupModal'
// import { BrowserRouter as Router, Route, Redirect, Link} from 'react-router-dom'

import Popup from "reactjs-popup";
import ImageCard from './ImageCard';
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'. Built with '}
      <Link color="inherit" href="https://material-ui.com/">
        Material-UI.
      </Link>
    </Typography>
  );
}
const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

function handleGoToAirport(e) {
  console.log(`in handleGoToAirport, e is `)
  console.log(e)
  console.log(e.target)
}

// const handleFollow = (loggedInUser, currentUserProfile) => {
  
//   console.log(`in handleFollow! ${isFollowing}`)

//   const users = {
//     userToUpdate: loggedInUser, // Holds the string of userName field.
//     isFollowing: isFollowing,
//     userToFollow: currentUserProfile; // Holds the string of userName field.
//   }


//   fetch('/user/addNewUser', {method: 'POST', body: newUserJSON, credentials: 'include'})
//   .then(response => {            
//       if (!response.ok) {                
//           throw response;
//       } else {
//           return response.json()
//       }
//   })
//   .then(newUser => {
//       console.log(`ProfileMaterialUI: handleFollow: in second fetch.`);
//   })
//   .catch(err => {
//     console.log(`ProfileMaterialUI: handleFollow: in second fetch. Error is: `);
//     console.log(err);
//   });
//   return false;
// }




export default function Album(props) {
  const classes = useStyles();

  const currentProfileUser = props.currentProfileUser;
  const loggedInUser = props.loggedInUser;
  const images = props.images;

  if(!loggedInUser) {
    return <div>Problem fetching / There is no logged in user. please refresh or try again</div>
  }

  const isUserVistingOwnProfile = props.loggedInUser.userName === props.desiredProfile;
  console.log(`in mateiralUI, currentProfileUser is`);
  console.log(currentProfileUser);
  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              {currentProfileUser.firstName} {currentProfileUser.lastName}
            </Typography>
            <div className="profile-picture">
             <div className="user_avatar">
                  {/* <img src="https://s3.amazonaws.com/uifaces/faces/twitter/dancounsell/73.jpg"></img> */}
                  <img src={`${currentProfileUser.profilePictureUrl}`}></img>
                  {isUserVistingOwnProfile ? 
                    <form className="" action="image/updateProfilePicture" method="post" encType="multipart/form-data" >
                      <input type="file" name="image" />
                      <input type="submit" name="submit" value="Submit" />
                    </form>
                    :
                    null
                  }
              </div>
            </div>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              <div> <PopupModal users={currentProfileUser.followedBy} textToDisplay={"Followers" } /></div>
              <div> <PopupModal users={currentProfileUser.following} textToDisplay={"Following" } /> </div>
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  { isUserVistingOwnProfile ? 
                    (!loggedInUser.following.includes(currentProfileUser.userName) ?
                      <button className="follow-button" onClick={() => props.handleFollow(currentProfileUser.userName)}>
                        Follow
                      </button>
                      :
                      <button className="unfollow-button"  onClick={() => props.handleUnfollow(currentProfileUser.userName)}>
                        Unfollow
                      </button>
                    )
                    :
                    null
                    }
                 
                </Grid>
              
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {!images ? "Loading..." :
            images.map((imageObj, index) => ( // to render loader until the images are here!
            
                    <ImageCard key={index} imageObj={imageObj} />
    
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}