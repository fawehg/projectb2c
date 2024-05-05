import React, { useState, useEffect } from 'react';
import './Avis.css';
import { FaStar } from 'react-icons/fa';
import Header from '../HeaderOuvrier/HeaderOuvrier';
import Footer from '../FooterOuvrier/FooterOuvrier';

const Avis = () => {
  const [avisData, setAvisData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAvis();
  }, []);

  const fetchAvis = async () => {
    try {
      const response = await fetch('/api/avis');
      const data = await response.json();
      setAvisData(data);
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors de la récupération des avis:', error);
    }
  };

  return (
    <div className='avis'>
      <Header/>
      <div className="avis-container">
        <h2>Avis des utilisateurs</h2>
        {loading ? (
          <p>Chargement des avis...</p>
        ) : (
          <ul className="comment-list">
            {avisData.length > 0 ? (
              avisData.map((avis, index) => (
                <li key={index} className="comment-item">
                  <div className="comment-rating">
                    {[...Array(5)].map((_, starIndex) => (
                      <FaStar
                        key={starIndex}
                        className="star"
                        color={starIndex < avis.rate ? "#ffc107" : "#e4e5e9"}
                        size={20}
                      />
                    ))}
                  </div>
                  <p>{avis.comment}</p>
                </li>
              ))
            ) : (
              <p>Aucun commentaire pour le moment.</p>
            )}
          </ul>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Avis;
