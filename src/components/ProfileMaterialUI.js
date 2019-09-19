import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import PopupModal from "./PopupModal";
import Loader from "react-loader-spinner";
import ImageCard from "./ImageCard";
import Copyright from './Copyright';

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2)
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    paddingTop: "56.25%" // 16:9
  },
  cardContent: {
    flexGrow: 1
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6)
  }
}));

export default function ProfileMaterialUI(props) {
  let handleDelete = function(_id, imgUrl) {
    console.log("in image delete with " + _id + " " + imgUrl);
    fetch(`/image/delete?imgUrl=${imgUrl}&id=${_id}&imgOwner=${props.currentProfileUser.userName}`, { method: "GET", credentials: "include" })
      .then(res => res.json())
      .then(_ => {
        console.log(window.location.href);
        window.location.href = `/`;
      });
  };

  const classes = useStyles();
  const currentProfileUser = props.currentProfileUser;
  const loggedInUser = props.loggedInUser;
  const images = props.images;

  if (!loggedInUser) {
    return (
      <p>
        Only logged in user can watch user profiles. Please Login or Register
      </p>
    );
  }

  const isUserVistingOwnProfile = props.loggedInUser.userName === currentProfileUser.userName;
  console.log(`in mateiralUI, currentProfileUser is`);
  console.log(currentProfileUser);
  console.log(isUserVistingOwnProfile);
  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              {currentProfileUser.firstName} {currentProfileUser.lastName}
            </Typography>
            <div className="profile-picture">
              <div className="user-info">
                <img src={`${currentProfileUser.profilePictureUrl}`}></img>
                {isUserVistingOwnProfile ? 
                (
                  <form action="/image/updateProfilePicture" method="post" encType="multipart/form-data">
                    <input type="file" name="image" />
                    <input type="submit" name="submit" value="Change Picture"/>
                  </form>
                ) : null}
              </div>
            </div>
            <Typography variant="h5" align="center" color="textSecondary" paragraph
            >
              <div>
                {" "}
                <PopupModal users={props.followingProfilePicture} textToDisplay={"Followers"} />
              </div>
              <div>
                {" "}
                <PopupModal users={props.followedByProfilePicture} textToDisplay={"Following"} />{" "}
              </div>
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  {!isUserVistingOwnProfile ? 
                  ( !loggedInUser.following.includes(currentProfileUser.userName) ? 
                    ( <button className="follow-button" onClick={() => props.handleFollow(currentProfileUser.userName) } >
                        Follow
                      </button>
                    ) 
                    : 
                    (
                      <button className="unfollow-button" onClick={() => props.handleUnfollow(currentProfileUser.userName) } >
                        Unfollow
                      </button>
                    )
                  ) : null}
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {!images ? 
            <div style={{ position: "fixed", left: "48%", top: "40%" }}>
              <Loader type="TailSpin" color="lightblue" height={40} width={40} />
            </div>
            : 
            images.map((imageObj, index) => (
                  <ImageCard key={index} imageObj={imageObj} handleDelete={handleDelete} isUserVistingOwnProfile={isUserVistingOwnProfile} />
                ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          {/* Footer */}
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}
