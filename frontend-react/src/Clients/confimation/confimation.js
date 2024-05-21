import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './confimation.css';
import { Link, useNavigate } from 'react-router-dom'
import Header from '../HeaderClient/HeaderClient';

const JobCard = ({ travail }) => {
 
 const handleSubmit = async (avisId, ouvrierId,demandeID) => {
    try {
    
      const token = localStorage.getItem('token');
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/client/valider`,
      console.log('rrrrrrrrrrrrr'),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

     
      
    } catch (error) {
      console.error("Erreur lors de la création de l'avis :", error.message);
    }
  };
  return (
    <div className="travail">
      <h2>Ouvrier</h2>
      <div className="travail-body">
        <p><strong>Nom:</strong> {travail.ouvrier.Nom}</p>
        <p><strong>Prénom:</strong> Zitoun</p>
        <p><strong>Adresse:</strong> {travail.ouvrier.Adresse}</p>
        <p><strong>Email:</strong> {travail.ouvrier.Email}</p>
      </div>
      <h2>Demande</h2>
      <div className="travail-body">
        <p><strong>Domaines:</strong> {travail.demande.Domaines}</p>
        <p><strong>Spécialités:</strong> {travail.demande.Spécialités}</p>
        <p><strong>Ville:</strong> {travail.demande.Ville}</p>
        <p><strong>Description:</strong> {travail.demande.Description}</p>
        <p><strong>Date:</strong> {travail.demande.Date}</p>
        <p><strong>Heure:</strong> {travail.demande.Heure}</p>
        
        </div>
        <div className='detaille'>
           <h2>Plus détails</h2> 
        <p><strong>Prix:</strong> {travail.prix} TND</p>
        <p><strong>Duree:</strong> {travail.duree} Minutes</p>
        <p><strong>Description:</strong> {travail.description}</p>
        </div>
        <Link to='/validation'>
                <button className='valider' onClick={handleSubmit}>Valider</button>
         </Link>
    </div>
  );
};

const Validation = () => {
  const [travail, setTravail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/client/validation`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data;
        setTravail(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <h1 style={{ fontSize: '30px', textAlign: 'center', marginTop: '10px' }}>Travail Confirmé</h1>
      <div className="validation">
        {loading ? (
          <p style={{ fontSize: '50px', textAlign: 'center', marginTop: '130px', color: 'blue' }}>Chargement...</p>
        ) : travail ? (
          <JobCard travail={travail} />
        ) : (
          <p style={{ fontSize: '50px', textAlign: 'center', marginTop: '130px', color: 'red' }}>Aucune information disponible</p>
        )}
      </div>
    </div>
  );
};

export default Validation;
