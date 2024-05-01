import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DemandeInfo({ clientInfo, demandeInfo }) {
  return (
    <div>
      <h2>Informations Client</h2>
      <p><strong>Nom du client:</strong> {clientInfo['Nom du client']}</p>
      <p><strong>Prénom du client:</strong> {clientInfo['Prénom du client']}</p>
      <p><strong>Adresse du client:</strong> {clientInfo['Adresse du client']}</p>
      <p><strong>Email du client:</strong> {clientInfo['Email du client']}</p>

      <h2>Informations Demande</h2>
      <p><strong>Domaines:</strong> {demandeInfo.Domaines}</p>
      <p><strong>Spécialités:</strong> {demandeInfo.Spécialités}</p>
      <p><strong>Ville:</strong> {demandeInfo.Ville}</p>
      <p><strong>Description:</strong> {demandeInfo.Description}</p>
    </div>
  );
}

function Jobs() {
  const [clientInfo, setClientInfo] = useState(null);
  const [demandeInfo, setDemandeInfo] = useState(null);

  // Function to fetch data from backend
  const fetchData = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/ouvrier/reserver-ouvrier`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
      const data = await response.json();
      setClientInfo(data.client);
      setDemandeInfo(data.demande);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {clientInfo && demandeInfo ? (
        <DemandeInfo clientInfo={clientInfo} demandeInfo={demandeInfo} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Jobs;
