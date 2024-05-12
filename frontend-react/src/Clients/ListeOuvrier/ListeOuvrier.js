import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, CardActions, Button, Typography, makeStyles } from '@material-ui/core';
import { Avatar } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import './ListeOuvrier.css';
const ListeOuvrier = () => {

  const [loading, setLoading] = useState(true);
  const [lastdemande, setlastdemande] = useState();
  const [ouvriers, setOuvriers] = useState([]); 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          throw new Error('Token not found in localStorage');
        }

        const response = await axios.get(`${process.env.REACT_APP_API_URL}/client/demandes`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const demandeData = response.data.ResultData.data;

        if (demandeData && demandeData.length > 0) {
          const lastDemande = demandeData[demandeData.length - 1];
          setlastdemande(lastDemande.id);
        } else {
          console.log('No demand data found.');
        }
      } catch (error) {
        console.error('Error fetching data:', error.message);
        // Handle error state or display error message
      } finally {
        // Regardless of success or failure, update loading state
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const demande_id = lastdemande;
console.log('MMMaaaaaaaaSSaaO', demande_id);

useEffect(() => {
  const fetchData = async () => { // Remove the demande_id parameter here
    try {
      const token = localStorage.getItem('token');
      console.log(token);
      console.log("AAAAAAAAAAAAAAAAAAAAAA", demande_id);
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/client/ouvriers`, {
        params: {
          demande_id: demande_id
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("AAAAAAAAAAAAAAAAAAAAAA", demande_id); // demande_id is now accessible here
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
  fetchData(); // No need to pass demande_id here
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
    <div className='mainOuv'>
       <div className="listeOuv">
                    <img src="/LOGO.png" className="LOGO-PROFIL" alt="LOGO-PROFIL" />

                        <ul>
                            <li><FontAwesomeIcon icon={faUsers} /> <Link to={`/validation`}><span>Validation en attente</span></Link> </li>
                            <br/>
                        </ul>  
                        
                  
                    </div>
      {loading ? (
        <div className='Aucune'>
          <Typography >
           
            Il n'y a pas d'orier dispoe pour le moment, veuillez rayer ultérieurement.
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
                <Typography variant="h5" component="h2">
                  Profession :{ouvrier.profession}
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
    </div>
  );
};

export default ListeOuvrier;
