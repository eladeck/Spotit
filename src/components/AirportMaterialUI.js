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
import { Link } from 'react-router-dom';

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


export default function AirportMaterialUI(props) {
  const classes = useStyles();

  
  const images = props.images;
  console.log("In AirportMaterialUI, images is:")
  console.log(images);
  const airportName = props.data.headline;
  const airportData = props.data.detailedInfo;
  console.log(`in AirportMaterialUI, airportData is`);
  console.log(airportData);


  let dataToDisplay = '';
  airportData.forEach(element => {
    dataToDisplay += element;
  });

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              {airportName}
            </Typography>
            <Typography paragraph="true" >
              {dataToDisplay}
            </Typography>
            {console.log(`AirportMaterialUI.js: main image URL is: ${props.data.imageUrl}`)}
            <img src={props.data.imageUrl} alt="main info image not found" height="300" width="300" />
          
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {!images ? "Loading..." :
            images.map((imageObj, index) => ( // to render loader until the images are here!
              <Grid item key={index} xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <div className="hoverable-image-container">
                      <img className="hoverable-image" src={`/${imageObj.userName}/${imageObj.url}`} />
                      {console.log(imageObj)}
                      {console.log(`${imageObj.userName}/${imageObj.url}`)}
                      {console.log(`-----------------------------------------------`)}
                      <div className="hoverable-overlay">
                        Airport:<Link to={`/airport/${imageObj.airport}`}>{imageObj.airport}</Link>
                      </div>
                    </div>
                </Card>
              </Grid>
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
       
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}