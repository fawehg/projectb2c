import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Rate = () => {
  const [loading, setLoading] = useState(true);
  const [avis, setAvis] = useState([]);
  // const [ouvrierId, setouvrierId] = useState();
  const {id} = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/client/avis?ouvrier_id=${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (Array.isArray(response.data.resultData.avis)) {
          setAvis(response.data.resultData.avis);
          console.log(avis)
        }
        setLoading(false);
      } catch (error) {

        setLoading(false);
      }
    };

    fetchData();
  }, [id]);
  return (
    <div className="avis-container">
      {avis.map((avisItem) => {
        const { id, client_nom, rate, commentaire, client_prenom } = avisItem;
        return (
          <div key={id} className="avis-card">
            <h2>{client_nom} {client_prenom} <h2 className="rating">
              {[...Array(rate)].map((_, index) => (
                <span key={index} className="star">&#9733;</span>
              ))}
            </h2></h2>

            <h3>{commentaire}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default Rate;
