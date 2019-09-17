import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom'

export default function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        Spotit
      </Link>{' '}
      {new Date().getFullYear()}
      {'. Partially Built with '}
      <Link color="inherit" href="https://material-ui.com/">
        Material-UI.
      </Link>
    </Typography>
  );
}