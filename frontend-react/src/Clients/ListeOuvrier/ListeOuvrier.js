import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardActions, Button, Typography, makeStyles } from '@material-ui/core';
import { Avatar } from '@mui/material';
import Footer from '../FooterClient/FooterClient';
import Header from '../HeaderClient/HeaderClient';

import './ListeOuvrier.css';

const ListeOuvrier = () => {
  const [ouvriers, setOuvriers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');    
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/client/ouvriers`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
        console.log("Données récupérées:", response.data.ResultData);
        const ouvriersData = response.data.ResultData.ouvriers;

        if (Array.isArray(ouvriersData)) {
          setOuvriers(ouvriersData);
        } else {
          console.error('Les données des ouvriers ne sont pas dans le format attendu.');
        }
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des données : ', error);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  const handleSubmit = async (ouvrierId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/client/reserver-ouvrier`, {
        ouvrier_id: ouvrierId,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log('Réservation effectuée avec succès:', response.data.message);
      // Ici vous pouvez afficher un message à l'utilisateur pour lui indiquer que la réservation a été effectuée avec succès
    } catch (error) {
      console.error('Erreur lors de la réservation : ', error);
      // Ici vous pouvez afficher un message à l'utilisateur pour lui indiquer qu'une erreur s'est produite lors de la réservation
    }
  };
  
  const useStyles = makeStyles({
    root: {
      maxWidth: 3450,
      margin: '10px',
      backgroundColor: 'rgba(24, 121, 201, 0.247)',
      borderRadius: 30,
      boxShadow: '0 14px 28px rgba(239, 235, 235, 0.25), 0 10px 10px rgba(14, 11, 216, 0.719)',
    },
    title: {
      fontSize: 20,
    },
    media: {
      height: 140,
    },
    message: {
      textAlign: 'center',
      fontSize: 20,
      marginTop: 20,
    },
  });

  const classes = useStyles();

  return (
    <div>
      <Header/>
      {loading ? (
        <div className='Aucune'>
          <Typography className={classes.message}>
            Oups !!
            Il n'y a pas d'ouvrier disponible pour le moment, veuillez réessayer ultérieurement.
          </Typography>
        </div>
      ) : (   
        <div>
          {ouvriers.map((ouvrier, index) => (
    <Card key={index} className={classes.root}>
    <CardContent>
      <Avatar alt={`${ouvrier.prenom} ${ouvrier.nom}`} src={ouvrier.image} className={classes.avatar} />
      <Typography variant="h5" component="h2">
        Nom: {ouvrier.prenom} {ouvrier.nom}  
      </Typography>
      <Typography variant="h5" component="h2">
        numéro du telephone :{ouvrier.numeroTelephone} 
      </Typography>
      <Typography variant="h5" component="h2">
        Email :{ouvrier.email}
      </Typography>
    </CardContent>
    <CardActions className='reserver' >  
    <Button size="small" onClick={(e) => handleSubmit(e)}>Réserver</Button>
    </CardActions>
  </Card>
          ))}
        </div>
      )}
      <Footer/>
    </div>
  );
};

export default ListeOuvrier;
