import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Jobs.css';
import Header from '../../HeaderOuvrier/HeaderOuvrier';

function DemandeInfo({ clientInfo, demandeInfo, onConfirmation, onRefus }) {
  return (
    <div className="card">
      <div>
        <h2>Offre de travail</h2>
        <p><strong>Nom du client:</strong> {clientInfo.Nom} {clientInfo.prenom}</p>
        <p><strong>Ville:</strong> {demandeInfo.Ville}</p>
        <p><strong>Domaines:</strong> {demandeInfo.Domaines}</p>
        <p><strong>Spécialités:</strong> {demandeInfo.Spécialités}</p>
        <p><strong>Date:</strong> {demandeInfo.Date}</p>
        <p><strong>Heure:</strong> {demandeInfo.Heure}</p>
      </div>
      <div>
        <h2>Plus de détails</h2>
        <p><strong>Adresse du client:</strong> {clientInfo.Adresse}</p>
        <p><strong>Email du client:</strong> {clientInfo.Email}</p>
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
  const [id,setId]=useState();
 
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const responseOuvrier = await axios.get(`${process.env.REACT_APP_API_URL}/ouvrier/profil`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = responseOuvrier.data.ResultData.data;
        setId(data.id);
        console.log(data.id);
      } catch (error) {
        console.error('Error fetching ouvrier profil:', error);
      }
    };

    fetchData();
  }, []); 

  useEffect(() => {
    const fetchData = async (ouvrier_id) => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/ouvrier/travail-demander`, {
          params: {
            ouvrier_id: ouvrier_id
          },
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        const data = response.data;
     

        setJobData(data); 
      } catch (error) {
        console.error('Error fetching travail-demander data:', error);
      }
    };

    if (id !== null) { 
      fetchData(id);
    }
  }, [id]); // Dependency on id, runs whenever id changes

console.log("aaaaaaaab",jobData)



const travail_id = jobData.length > 0 ? jobData[jobData.length - 1].id : null;
console.log("Le dernier élément du tableau est :", travail_id);
  const handleConfirmation = async () => {
    try {
        const token = localStorage.getItem('token');
       
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/ouvrier/confirm-demande`, {
          travail_id  :travail_id,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
       
        if (response && response.data && response.data.message) {
            console.log('Réservation effectuée avec succès:', response.data.message);
        } else {
            console.error('Réponse de serveur invalide:', response);
        }
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
    </div>
  );
}

export default Jobs;
