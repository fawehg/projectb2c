    import React, { useState, useEffect } from 'react';
    import axios from 'axios';
    import './Validation.css';
import Header from '../HeaderClient/HeaderClient';

    const TravailCard = ({ travail }) => {
    return (
        <div className="card">
        <div className="card-header">
            <h2>Ouvrier</h2>
        </div>
        <div className="card-body">
            <p><strong>Nom:</strong> {travail.ouvrier.Nom}</p>
            <p><strong>Prénom:</strong> {travail.ouvrier.Prénom}</p>
            <p><strong>Adresse:</strong> {travail.ouvrier.Adresse}</p>
            <p><strong>Email:</strong> {travail.ouvrier.Email}</p>
        </div>
        <div className="card-header">
            <h2>Demande</h2>
        </div>
        <div className="card-body">
            <p><strong>Domaines:</strong> {travail.demande.Domaines}</p>
            <p><strong>Spécialités:</strong> {travail.demande.Spécialités}</p>
            <p><strong>Ville:</strong> {travail.demande.Ville}</p>
            <p><strong>Description:</strong> {travail.demande.Description}</p>
            <p><strong>Date:</strong> {travail.demande.Date}</p>
            <p><strong>Heure:</strong> {travail.demande.Heure}</p>
        </div>
        </div>
    );
    };

    const Validation = () => {
    const [travail, setTravail] = useState(null);

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
            setTravail(data); // Assuming data is an array of job objects
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        };

        fetchData();
    }, []);

    return (
       <div>
         <Header/>
         <h1 style={{ fontSize: '30px', textAlign: 'center', marginTop: '10px' }}>Travail Confimer</h1>
        <div className="validation">
          {travail ? (
            <TravailCard travail={travail} />
          ) : (
            <p style={{ fontSize: '50px', textAlign: 'center', marginTop: '130px', color:'red' }}>Aucune information disponible</p>
          )}
        </div></div>

    
      );
    };
    
    export default Validation;