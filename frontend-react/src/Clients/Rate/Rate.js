import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Rate = () => {
  const [ratesData, setRatesData] = useState([]);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axios.get('URL_DE_VOTRE_API_POUR_LES_RATES');
        setRatesData(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des taux :', error);
      }
    };

    fetchRates();
  }, []);

  return (
    <div>
      <h2>Taux des utilisateurs</h2>
      <div>
        {ratesData.map((rate, index) => (
          <div key={index}>
            <p>Taux : {rate.rate}</p>
            <p>Commentaire : {rate.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rate;
