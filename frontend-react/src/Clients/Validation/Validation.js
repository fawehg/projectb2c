import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Validation.css';
import Header from '../HeaderClient/HeaderClient';

function StarRating({ rating, onChange }) {
  return (
    <div className="star-cb-group">
      {[5, 4, 3, 2, 1].map(value => (
        <React.Fragment key={value}>
          <input
            type="radio"
            id={`rating-${value}`}
            name="rating"
            value={value}
            onChange={onChange}
            checked={rating === value}
          />
          <label htmlFor={`rating-${value}`}>{value}</label>
        </React.Fragment>
      ))}
    </div>
  );
}

const JobCard = ({ travail }) => {
  const [rating, setRating] = useState(4);
  const [commentaire, setCommentaire] = useState('');
  const [avis_id, setAvis_id] = useState(null);

  const handleChange = (event) => {
    setRating(Number(event.target.value));
  };

  const handleSubmitCommentaire = async (ouvrierId) => {
    try {
      const requestData = {
        rate: rating,
        commentaire: commentaire,
        ouvrier_id: ouvrierId,
      };
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/client/avis`,
        requestData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
       const avisId = response.data.resultData.avis_id;
       setAvis_id(avisId);
       console.log('Avis ID:', avisId)

        setRating(0);
        setCommentaire('');
      } else {
        throw new Error("Erreur lors de la création de l'avis.");
      }
    } catch (error) {
      console.error("Erreur lors de la création de l'avis :", error.message);
    }
  };

  const handleSubmit = async (avisId, ouvrierId) => {
    try {
      const requestData = {
        IDavis: avisId,
        IDouvrier: ouvrierId,
      };
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/client/effectue`,
        requestData,
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
        <button className='valider' onClick={() => handleSubmit(avis_id, travail.ouvrier.id)}>Travail effectué</button>
        <h1>Ajouter votre Avis</h1>
        <StarRating rating={rating} onChange={handleChange} />
        <textarea
          className="commentaire"
          placeholder="Ajouter un commentaire..."
          value={commentaire}
          onChange={(e) => setCommentaire(e.target.value)}
          rows="4"
          cols="50"
        ></textarea>
        <button className='commenter' onClick={() => handleSubmitCommentaire(travail.ouvrier.id)}>Ajouter Un commentaire</button>
      </div>
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
