import React, { useState, useEffect } from 'react';
import HeaderClient from '../HeaderClient/HeaderClient';
import FooterClient from '../FooterClient/FooterClient';
import './RechercheOuvrier.css';
import axios from 'axios';

const RechercheOuvrier = () => {
  const [domaines, setDomaines] = useState([]);
  const [specialites, setSpecialites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDomain, setSelectedDomain] = useState('');
  const [selectedSpecialite, setSelectedSpecialite] = useState('');
  const [city, setCity] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/domaines`)
      .then(response => {
        setDomaines(response.data || []);
      })
      .catch(error => {
        setError(error.message);
      });

    axios.get(`${process.env.REACT_APP_API_URL}/specialites`)
      .then(response => {
        setSpecialites(response.data || []);
      })
      .catch(error => {
        setError(error.message);
      });

  }, []); 

  const gouvernorats = [
    "Ariana", "Béja", "Ben Arous", "Bizerte", "Gabès", "Gafsa", "Jendouba", "Kairouan",
    "Kasserine", "Kébili", "Le Kef", "Mahdia", "La Manouba", "Médenine", "Monastir",
    "Nabeul", "Sfax", "Sidi Bouzid", "Siliana", "Sousse", "Tataouine", "Tozeur", "Tunis", "Zaghouan"
  ];
  
  const handleDomainChange = (event) => {
    setSelectedDomain(event.target.value);
    setSelectedSpecialite('');
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { selectedDomain, selectedSpecialite, city, date, time, description,image };
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/demandes`, 
          JSON.stringify(this.state),
          {
              headers: {
                  'Content-Type': 'application/json',
              },
          }    
      );  console.log(response.data);
   
} catch (error) {
    console.error('Erreur lors de la requête :', error);
}
} 

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };
  const filteredSpecialites = domaines
    .find(domaine => domaine.nom_domaine === selectedDomain)
    ?.specialites || [];
  
  return (
    <div>
      <HeaderClient />
      
      <div className="service-search">
        <form onSubmit={handleSubmit} className="service-search-form">
          <h1>Veuillez Choisir votre Ouvrier</h1>
          <select
            className="input-field"
            value={selectedDomain}
            onChange={handleDomainChange}
            name="service"
          >
            <option value="">Sélectionnez un domaine</option>
            {domaines && domaines.map((domaine, index) => (
              <option key={index} value={domaine.id_domaine}>{domaine.nom_domaine}</option>
            ))}
          </select>
          
          <select
            className="input-field"
            value={selectedSpecialite}
            onChange={(e) => setSelectedSpecialite(e.target.value)}
            name=""
          >
            <option value="">Sélectionnez une spécialité</option>
            {filteredSpecialites && filteredSpecialites.map((specialite, index) => (
              <option key={index} value={specialite.id}>{specialite.nom_specialite}</option>
            ))}
          </select>
          <select value={city} onChange={(e) => setCity(e.target.value)}  className="input-field">
            <option value="">Sélectionner une ville</option>
            {gouvernorats.map((gouvernorat) => (
              <option key={gouvernorat} value={gouvernorat}>{gouvernorat}</option>
            ))}
          </select>
          
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="input-field"
          />
          <input
           className="input-field"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
           
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Explication"
            className="input-field"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="input-field"
          />
          <button type="submit">Rechercher</button>
        </form>
        <img src="./RechercheOuv.png" className="RechercheOuv" />
        </div>
        
      
      <FooterClient />
    </div>
  
  );
};

export default RechercheOuvrier;
