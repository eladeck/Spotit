import React, { Component } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import GoSpotit from "./GoSpotit";
import ImageCard from "./ImageCard";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/">
        Spotit
      </Link>{" "}
      {new Date().getFullYear()}
      {". Partially Built with "}
      <Link color="inherit" href="https://material-ui.com/">
        Material-UI.
      </Link>
    </Typography>
  );
}
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

export default class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.useStyles = this.useStyles.bind(this);
  }

  useStyles() {
    return makeStyles(theme => ({
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
  }

  fetchRecentPictures() {
    fetch(`/image/recentImages`, { method: "GET", credentials: "include" })
      .then(response => {
        return response.json();
      })
      .then(res => {
        if (res.errMsg) {
          throw res.errMsg;
        } else {
          console.log(
            `LandingPage.js: componentDidMount: inside second then: res is: `
          );
          console.log(res);
          return res;
        }
      })
      .catch(errMsg => {
        console.log(errMsg);
        return null;
      });
  }

  render() {
    const classes = this.useStyles();

    const images = this.props.imagesToDisplay;

    return (
      <React.Fragment>
        <CssBaseline />
        <main>
          {/* Hero unit */}
          <div className={classes.heroContent}>
            <div className="landing-page-iamge-container">
              <img
                src="/defaultPicturesToBeDisplayed/LandingPage.jpg"
                alt="Not working.."
                style={{ width: "100%", opacity: "0.5", height: "456px" }}
              />
              <div className="buttom-center-paragraph">
                Welcome to SpotIt! <br />
                The first social media for airplane spotters. <br />
                Here, you can find the latest updates about special flight
                arrivals, and share your latest shots with other spotters.{" "}
                <br />
                Let's go SpotIt!
              </div>
            </div>
          </div>
          <Container className={classes.cardGrid} maxWidth="md">
            {/* End hero unit */}
            <GoSpotit flightInfo={this.props.flightInfo} />

            <Grid container spacing={4}>
              {!images
                ? "Loading..."
                : images.map((
                    imageObj,
                    index // to render loader until the images are here!
                  ) => <ImageCard key={index} imageObj={imageObj} />)}
            </Grid>
          </Container>
          {/* <TopSpotIts /> */}
        </main>
        {/* Footer */}
        <footer className={classes.footer}>
          <Typography variant="h6" align="center" gutterBottom>
            {/* Footer */}
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="textSecondary"
            component="p"
          >
          </Typography>
          <Copyright />
        </footer>
        {/* End footer */}
      </React.Fragment>
    );
  }
}
