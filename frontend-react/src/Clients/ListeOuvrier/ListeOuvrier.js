import React from 'react';
import { Card, CardContent, CardActions, Button, Typography, makeStyles, CardMedia } from '@material-ui/core';
import Footer from '../FooterClient/FooterClient';
import Header from '../HeaderClient/HeaderClient';


const useStyles = makeStyles({
  root: {
    maxWidth: 3450,
    margin: '10px',
  },
  title: {
    fontSize: 20,
  },
  media: {
    height: 20,
  },
});

const ListeOuvrier = ({ nom, prenom, photo, telephone, actionText }) => {
  const classes = useStyles();

  return (
    <div>
      <Header/>
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={photo}
          title={`${prenom} ${nom}`}
        />
        <CardContent>
          <Typography variant="h5" component="h2">
            Nom :{prenom} {nom}
          </Typography>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Téléphone: {telephone}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">{actionText}</Button>
        </CardActions>
      </Card>
      <Footer/>
    </div>
  );
};

export default ListeOuvrier;
