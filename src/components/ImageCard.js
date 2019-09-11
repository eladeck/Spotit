import React, {Component} from "react"
import Popup from "reactjs-popup";
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    }
  }));
export default function ImageCard(props) {
    const classes = useStyles();
    const imageObj = props.imageObj;
    console.log(imageObj)
    console.log(classes)
    console.log(`url is: ${imageObj.userName}/${imageObj.url}`);
    
    return(
        <>
            <Grid item xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                    <div className="hoverable-image-container">
                    <Popup
                    trigger={<img className="hoverable-image" alt="Image couldn't be displayed" src={`/${imageObj.userName}/${imageObj.url}`} />}
                    modal
                    closeOnDocumentClick
                    >
                        <span> <img className="hoverable-image" alt="Image couldn't be displayed" src={`/${imageObj.userName}/${imageObj.url}`} /> </span>
                    </Popup>
                    <div className="hoverable-overlay">
                        <ul className="text-in-overlay">
                            <li className="inner-of-image-li">Aircraft:<Link to={`/info/airplaneModel/${imageObj.airplaneModel}`}>{imageObj.airplaneModel}</Link></li>
                            <li className="inner-of-image-li">Airport:<Link to={`/info/airport/${imageObj.airport}`}>{imageObj.airport}</Link></li>
                            <li className="inner-of-image-li"><Link to={`/info/city/${imageObj.city}`}>{imageObj.city}</Link>, <Link to={`/info/country/${imageObj.country}`}>{imageObj.country}</Link></li>
                            <li className="inner-of-image-li">Code: {imageObj.code}</li>
                        </ul>
                    </div>

                    </div>
                </Card>
            </Grid>
        </>
    );
  } // ImageCard