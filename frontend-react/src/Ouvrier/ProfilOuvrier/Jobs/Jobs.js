import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Jobs.css';
import Header from '../../HeaderOuvrier/HeaderOuvrier';
import Footer from '../../FooterOuvrier/FooterOuvrier';

function DemandeInfo({ clientInfo, demandeInfo, onConfirmation, onRefus }) {
  return (
    <div className="card">
      <div>
        <h2>Offre de travail</h2>
        <p><strong>Nom du client:</strong> {clientInfo['Nom du client']} {clientInfo['Prénom du client']}</p>
        <p><strong>Ville:</strong> {demandeInfo.Ville}</p>
        <p><strong>Domaines:</strong> {demandeInfo.Domaines}</p>
        <p><strong>Spécialités:</strong> {demandeInfo.Spécialités}</p>
        <p><strong>Date:</strong> {demandeInfo.date}</p>
        <p><strong>Heure:</strong> {demandeInfo.heure}</p>
      </div>
      <div>
        <h2>Plus de détails</h2>
        <p><strong>Adresse du client:</strong> {clientInfo['Adresse du client']}</p>
        <p><strong>Email du client:</strong> {clientInfo['Email du client']}</p>
        <p><strong>Description:</strong> {demandeInfo.Description}</p>
      </div>
      <div className="Acceptation">
        <button className="confirm" onClick={onConfirmation}>Confirmer</button>
        <button className="reject" onClick={onRefus}>Refuser</button>
      </div>
    </div>
  );
}

function Jobs() {
  const [jobData, setJobData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/ouvrier/travail-demander`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data;
        setJobData(data); // Assuming data is an array of job objects
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleConfirmation = async (index) => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/ouvrier/confirm-demande`, {
        // Add data to be sent in the post request if needed
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
  

  const handleRefus = (index) => {
    console.log("Job rejected:", index);
  };

  return (
    <div className='jobs'>
      <Header/>
      {jobData.length > 0 ? (
        jobData.map((job, index) => (
          job && job.client && job.demande ? (
            <DemandeInfo
              key={index}
              clientInfo={job.client}
              demandeInfo={job.demande}
              onConfirmation={() => handleConfirmation(index)}
              onRefus={() => handleRefus(index)}
            />
          ) : null
        ))
      ) : (
        <p>Loading...</p>
      )}
      <Footer/>
    </div>
  );
}

export default Jobs;
