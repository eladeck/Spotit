import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import ImageCard from "./ImageCard";

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

export default function GeneralInfoMaterialUI(props) {
  const classes = useStyles();

  const images = props.images;
  console.log("In GeneralInfoMaterialUI, images is:");
  console.log(images);
  const headline = props.data.headline;
  const detailedInfo = props.data.detailedInfo;
  console.log(`in GeneralInfoMaterialUI, detailedInfo is`);
  console.log(detailedInfo);

  let dataToDisplay = "";
  detailedInfo.forEach(element => {
    dataToDisplay += element;
  });

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <div class="general-info-box">
              <div class="general-info-left">
                <h1 className="general-info-left-h1">{headline}</h1>
                <p>{dataToDisplay}</p>
              </div>

              <div class="general-info-right">
                <img
                  src={props.data.imageUrl}
                  alt="main info image not found"
                  height="100%"
                  width="100%"
                />
              </div>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {console.log(`GeneralInfoMaterialUI: render(): images are `)}
            {console.log(images)}
            {!images || images.errMsg
              ? "There currently aren't additional images to present."
              : images.map((
                  imageObj,
                  index // to render loader until the images are here!
                ) => <ImageCard key={index} imageObj={imageObj} />)}
          </Grid>
        </Container>
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
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}
