import React, { useState } from 'react';
import HeaderClient from '../HeaderClient/HeaderClient';
import FooterClient from '../FooterClient/FooterClient';
import './RechercheOuvrier.css';

const RechercheOuvrier = () => {
  const [service, setService] = useState('');
  const [panneType, setPanneType] = useState('');
  const [city, setCity] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const serviceToPanneTypes = {
    Maçon: ['Mur endommagé', 'Fondation fissurée', 'Béton dégradé'],
    Charpentier: ['Toiture endommagée', 'Charpente affaissée', 'Isolation défectueuse'],
    Plombier: ['Fuite d\'eau', 'Canalisations bouchées', 'Problème de chauffe-eau'],
    Peintre: ['Peinture écaillée', 'Décoloration de la peinture', 'Mauvaise préparation de surface'],
    Menuisier: ['Fenêtre cassée', 'Porte qui coince', 'Escalier endommagé'],
    Carreleur: ['Carrelage fissuré', 'Joint de carrelage détérioré', 'Carrelage mal posé'],
    Couvreur: ['Tuile cassée', 'Problème d\'étanchéité', 'Chéneau obstrué'],
    Plâtrier: ['Plafond fissuré', 'Enduit qui se décolle', 'Cloison abîmée'],
    Ferronnier: ['Portail déformé', 'Rampe d\'escalier endommagée', 'Grille rouillée'],
    'Installateur HVAC': ['Climatisation en panne', 'Système de chauffage défaillant', 'Ventilation bruyante'],
    'Jardinier / Paysagiste': ['Pelouse envahie de mauvaises herbes', 'Taille d\'arbres à effectuer', 'Problème d\'arrosage automatique']
  };

  const gouvernorats = [
    "Ariana", "Béja", "Ben Arous", "Bizerte", "Gabès", "Gafsa", "Jendouba", "Kairouan",
    "Kasserine", "Kébili", "Le Kef", "Mahdia", "La Manouba", "Médenine", "Monastir",
    "Nabeul", "Sfax", "Sidi Bouzid", "Siliana", "Sousse", "Tataouine", "Tozeur", "Tunis", "Zaghouan"
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = { service, panneType, city, date, time, description };
      const response = await fetch('http://localhost:8000/api/demandes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        console.log('Formulaire soumis avec succès !');
      } else {
        console.error('Erreur lors de la soumission du formulaire.');
      }
    } catch (error) {
      console.error('Erreur lors de la soumission du formulaire :', error);
    }
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  return (
    <div>
      <HeaderClient />
      <div className="background-image"/>
      <div className="service-search">
        <form onSubmit={handleSubmit}>
          <h1>Veuillez Choisir votre Ouvrier</h1>
          <select value={service} onChange={(e) => setService(e.target.value)}>
            <option value="">Sélectionner un service</option>
            {Object.keys(serviceToPanneTypes).map((service) => (
              <option key={service} value={service}>{service}</option>
            ))}
          </select>
          <select value={panneType} onChange={(e) => setPanneType(e.target.value)}>
            <option value="">Sélectionner un type de panne</option>
            {serviceToPanneTypes[service]?.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <select value={city} onChange={(e) => setCity(e.target.value)}>
            <option value="">Sélectionner une ville</option>
            {gouvernorats.map((gouvernorat) => (
              <option key={gouvernorat} value={gouvernorat}>{gouvernorat}</option>
            ))}
          </select>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Explication"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          <button type="submit">Rechercher</button> {/*Changed button text to "Rechercher"*/}
        </form>
      </div>
      <FooterClient />
    </div>
  );
};

export default RechercheOuvrier;
