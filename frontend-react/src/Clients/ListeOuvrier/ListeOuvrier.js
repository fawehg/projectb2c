import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardActions, Button, Typography, makeStyles } from '@material-ui/core';
import Footer from '../FooterClient/FooterClient';
import Header from '../HeaderClient/HeaderClient';

import './ListeOuvrier.css';

const ListeOuvrier = () => {
  const [ouvriers, setOuvriers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupérer le token depuis le localStorage
        const token = localStorage.getItem('token');
        console.log("Token:", token); 
    
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/client/ouvriers`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
        console.log("Données récupérées:", response.data);
    
        // Si vous utilisez useState pour gérer l'état des données
        setOuvriers(response.data.ResultData);
        
        // Sinon, si vous utilisez une autre méthode pour gérer les données, remplacez la ligne ci-dessus par votre propre logique pour gérer les données récupérées.
    
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
      marginTop: 20,
      marginRight:10,
    },
  });

  const classes = useStyles();

  return (
    <div>
      <Header/>
      {ouvriers.length === 0 ? (
        <div className='Aucune'>
          <Typography className={classes.message}>
            Oups !!
            Il n'y a pas d'ouvrier disponible pour le moment, veuillez réessayer ultérieurement.
          </Typography>
        </div>
      ) : (
        ouvriers.map((ouvrier, index) => (
          <Card key={index} className={classes.root}>
            <CardContent>
              <Typography variant="h5" component="h2">
                Nom: {ouvrier.prenom} {ouvrier.nom}
              </Typography>
              {ouvrier.specialties && (
                <Typography variant="body2" color="textSecondary" component="p">
                  Spécialités: {ouvrier.specialties.join(', ')}
                </Typography>
              )}
            </CardContent>
            <CardActions>
              <Button size="small">Réserver</Button>
            </CardActions>
          </Card>
        ))
      )}
      <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
      <Footer/>
    </div>
  );
};

export default ListeOuvrier;
