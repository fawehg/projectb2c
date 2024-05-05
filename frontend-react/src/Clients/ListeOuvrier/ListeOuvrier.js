import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
    } catch (error) {
      console.error('Erreur lors de la réservation : ', error);
    }
  };
  


  return (
    <div>
      <Header/>
      {loading ? (
        <div className='Aucune'>
          <Typography >
            Oups !!
            Il n'y a pas d'ouvrier disponible pour le moment, veuillez réessayer ultérieurement.
          </Typography>
        </div>
      ) : (   
        <div>
          {ouvriers.map((ouvrier, index) => (
            <Card key={index} className='liste'>
              <CardContent>
                <Avatar alt={`${ouvrier.prenom} ${ouvrier.nom}`} src={ouvrier.image} />
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
              <CardActions className='reserver'>  
                <Button size="small" onClick={() => handleSubmit(ouvrier.id)} >Réserver</Button>
              </CardActions>
              <CardActions className='Avis'>  
                <Link to='/avis'><Button size="small">Avis</Button></Link>
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
