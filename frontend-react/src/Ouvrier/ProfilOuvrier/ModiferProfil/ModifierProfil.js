import React, { useState, useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faMapMarkerAlt, faAddressCard, faLock } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Header from '../../HeaderOuvrier/HeaderOuvrier';
import Footer from '../../FooterOuvrier/FooterOuvrier';
import './ModifierProfil.css';

const ModiferProfil = () => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [ville, setVille] = useState('');
  const [numeroTelephone, setnumeroTelephone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmationMotDePasse, setConfirmationMotDePasse] = useState('');
  const [joursDisponibilite, setJoursDisponibilite] = useState([]);
  const [heureDebut, setHeureDebut] = useState('');
  const [heureFin, setHeureFin] = useState('');
  const [errors, setErrors] = useState({});
  const [image, setImage] = useState(null);
  const [notification, setNotification] = useState('');
  const [photoProfil, setPhotoProfil] = useState('');
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState('');
  

  useEffect(() => {
    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/ouvrier/profil`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = response.data.ResultData.data;
            setNom(data.nom);
            setPrenom(data.prenom);
            setEmail(data.email);
            setVille(data.ville);
            setnumeroTelephone(data.numeroTelephone);
            setId(data.id);
      
            console.log(data.id);
        } catch (error) {
            console.error('Erreur lors de la récupération des données : ', error);
          
        }
    };

    fetchData();
}, []);
  const handleAvailabilityChange = (e) => {
    const day = e.target.value;
    setJoursDisponibilite(prevState => {
      if (prevState.includes(day)) {
        return prevState.filter(item => item !== day);
      } else {
        return [...prevState, day];
      }
    });
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setImage(imageFile);
  };
  const navigate=useNavigate();
  const handleModifierProfil = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      console.log("Token:", token); 
      
      const formData = new FormData();
      formData.append('nom', nom);
      formData.append('prenom', prenom);
      formData.append('email', email);
      formData.append('ville', ville);
      formData.append('numeroTelephone', numeroTelephone);
      formData.append('password', password);
      formData.append('confirmationMotDePasse', confirmationMotDePasse);
      formData.append('joursDisponibilite', JSON.stringify(joursDisponibilite)); // Corrected
      formData.append('heureDebut', heureDebut);
      formData.append('heureFin', heureFin);
      formData.append('image', image);
    
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/ouvrier/update-profil`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Profil modifié avec succès !");
      alert('Profil modifié avec succès !');
      navigate('/profil-ouvrier');
    } catch (error) {
      console.error('Erreur lors de la modification du profil : ', error);
      setNotification('Erreur lors de la modification du profil');
    }
  };

  return (
    <div>
      <Header />
      <div className="update-profil">
        <form onSubmit={handleModifierProfil} className='form-update'>
          <h1>Modifier le profil</h1>
          <div className="input-container">
            <FontAwesomeIcon icon={faUser} className="icon" />
            <input
              className="input-field"
              type="text"
              placeholder="Nom"
              name="nom"
              value={nom}
              onChange={e => setNom(e.target.value)}
            />
            {errors.nom && <p className="error-message">{errors.nom}</p>}
          </div>
          <div className="input-container">
            <FontAwesomeIcon icon={faUser} className="icon" />
            <input
              className="input-field"
              type="text"
              placeholder="Prénom"
              name="prenom"
              value={prenom}
              onChange={e => setPrenom(e.target.value)}
            />
            {errors.prenom && <p className="error-message">{errors.prenom}</p>}
          </div>
          <div className="input-container">
            <FontAwesomeIcon icon={faEnvelope} className="icon" />
            <input
              className="input-field"
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>
          <div className="input-container">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="icon" />
            <input
              className="input-field"
              type="text"
              placeholder="Ville"
              name="ville"
              value={ville}
              onChange={e => setVille(e.target.value)}
            />
            {errors.ville && <p className="error-message">{errors.ville}</p>}
          </div>
          <div className="input-container">
            <FontAwesomeIcon icon={faAddressCard} className="icon" />
            <input
              className="input-field"
              type="text"
              placeholder="numéro du Télephone"
              name="numeroTelephone"
              value={numeroTelephone}
              onChange={e => setnumeroTelephone(e.target.value)}
            />
            {errors.numeroTelephone && <p className="error-message">{errors.numeroTelephone}</p>}
          </div>
          <div className="input-container">
            <FontAwesomeIcon icon={faLock} className="icon" />
            <input
              className="input-field"
              type="password"
              placeholder="Mot de passe"
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            {errors.password && <p className="error-message">{errors.password}</p>}
          </div>
          <div className="input-container">
            <FontAwesomeIcon icon={faLock} className="icon" />
            <input
              className="input-field"
              type="password"
              placeholder="Confirmation du mot de passe"
              name="confirmationMotDePasse"
              value={confirmationMotDePasse}
              onChange={e => setConfirmationMotDePasse(e.target.value)}
            />
            {errors.confirmationMotDePasse && <p className="error-message">{errors.confirmationMotDePasse}</p>}
          </div>

          <h3>Jours de disponibilité :</h3>
          <div className="input-field-container">
            {['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'].map((day, index) => (
              <label key={index}>
                <input
                  type="checkbox"
                  value={day}
                  checked={joursDisponibilite.includes(day)}
                  onChange={handleAvailabilityChange}
                />
                {day}
              </label>
            ))}
          </div>

          <div className="input-field-container">
            <label htmlFor="heureDebut">Heure de début:</label>
            <input
              className="input-field"
              type="time"
              placeholder="Heure de début"
              name="heureDebut"
              value={heureDebut}
              onChange={e => setHeureDebut(e.target.value)}
            />
            <label htmlFor="heureFin">Heure de Fin:</label>
            <input
              className="input-field"
              type="time"
              placeholder="Heure de fin"
              name="heureFin"
              value={heureFin}
              onChange={e => setHeureFin(e.target.value)}
            />
          </div>
          <div className="input-field-container">
            <label htmlFor="image">Image:</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/jpeg, image/png, image/jpg, image/gif"
              onChange={handleImageChange}
            />
            {errors.image && <p className="error-message">{errors.image.join(', ')}</p>}
          </div>

          <button type="submit">Modifier</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default ModiferProfil;
