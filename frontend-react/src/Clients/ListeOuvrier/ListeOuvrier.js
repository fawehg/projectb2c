import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardActions, Button, Typography, makeStyles, CardMedia } from '@material-ui/core';
import Footer from '../FooterClient/FooterClient';
import Header from '../HeaderClient/HeaderClient';
import { red } from '@material-ui/core/colors';

const ListeOuvrier = () => {
  const [ouvriers, setOuvriers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log("Token:", token);

        const response = await axios.get(`${process.env.REACT_APP_API_URL}/client/ouvriers`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        console.log("Données récupérées:", response.data);

        setOuvriers(response.data.ResultData);

      } catch (error) {
        console.error('Erreur lors de la récupération des données : ', error);
      }
    };
  
    fetchData();
  }, []);

  const useStyles = makeStyles({
    root: {
      maxWidth: 345,
      margin: '10px',
    },
    title: {
      fontSize: 20,
    },
    media: {
      height: 140,
    },
    message: {
      textAlign: 'center',
      fontSize: 50,
      marginTop: 200,
      
    },
  });

  const classes = useStyles();

  return (
    <div>
      <Header/>
      {ouvriers.length === 0 ? (
        
        
        <Typography className={classes.message}>
          Oups !!
          <div className='Aucune'>   Il n'y a pas d'ouvrier disponible pour le moment, veuillez réessayer ultérieurement.</div>
        </Typography>
        
      ) : (
        ouvriers.map((ouvrier, index) => (
          <Card key={index} className={classes.root}>
            <CardContent>
              <Typography variant="h5" component="h2">
                Nom: {ouvrier.prenom} {ouvrier.nom}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Réserver</Button>
            </CardActions>
          </Card>
        ))
      )}
      <Footer/>
    </div>
  );
};

export default ListeOuvrier;
