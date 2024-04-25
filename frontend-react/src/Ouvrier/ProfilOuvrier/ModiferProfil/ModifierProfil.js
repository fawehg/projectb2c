import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faMapMarkerAlt, faAddressCard, faLock } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Header from '../../HeaderOuvrier/HeaderOuvrier';
import Footer from '../../FooterOuvrier/FooterOuvrier';

const ModiferProfil = () => {
  const [domain, setDomain] = useState({});
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [ville, setVille] = useState('');
  const [numeroTelephone, setnumeroTelephone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmationMotDePasse, setConfirmationMotDePasse] = useState('');
  const [profession, setProfession] = useState('');
  const [specialties, setSpecialties] = useState([]);
  const [joursDisponibilite, setJoursDisponibilite] = useState([]);
  const [heureDebut, setHeureDebut] = useState('');
  const [heureFin, setHeureFin] = useState('');
  const [errors, setErrors] = useState({});
  const [selectedDomain, setSelectedDomain] = useState('');
  const [filteredSpecialites, setFilteredSpecialites] = useState([]);
  const [image, setImage] = useState(null);
  const [notification, setNotification] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [domainesResponse, specialitesResponse] = await Promise.all([
          axios.get(`${process.env.REACT_APP_API_URL}/domaines`),
          axios.get(`${process.env.REACT_APP_API_URL}/specialites`),
        ]);

        setDomain({
          domaines: domainesResponse.data || [],
          specialites: specialitesResponse.data || [],
        });
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    };

    fetchData();
  }, []);

  const handleDomainChange = (event) => {
    const selectedDomain = event.target.value;
    const domainData = domain.domaines.find(domaine => domaine.nom_domaine === selectedDomain);
    setSelectedDomain(selectedDomain);
    if (!domainData) {
      setProfession('');
      setSpecialties([]);
      setFilteredSpecialites([]);
      return;
    }

    const filteredSpecialites = domainData.specialites || [];
    const professionData = domainData.nom_domaine || '';
    setProfession(professionData);
    setSpecialties([]);
    setFilteredSpecialites(filteredSpecialites);
  };

  const handleSpecialtyChange = (e) => {
    const { name, checked } = e.target;
    
    if (checked) {
      setSpecialties(prevSpecialties => [...prevSpecialties, name]);
    } else {
      setSpecialties(prevSpecialties => prevSpecialties.filter(specialty => specialty !== name));
    }
  };
  
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
      formData.append('profession', profession);
      formData.append('specialties', JSON.stringify(specialties)); // Corrected
      formData.append('joursDisponibilite', JSON.stringify(joursDisponibilite)); // Corrected
      formData.append('heureDebut', heureDebut);
      formData.append('heureFin', heureFin);
      formData.append('image', image);
    
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/ouvrier/mettreAJourProfil`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Profil modifié avec succès !");
      setNotification('Profil modifié avec succès !');
      console.log(response.data); 
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
          <div className="input-field-container">
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
          <div className="input-field-container">
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
          <div className="input-field-container">
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
          <div className="input-field-container">
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
          <div className="input-field-container">
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
          <div className="input-field-container">
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
          <div className="input-field-container">
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

          <select
            className="input-field-container select-field"
            value={selectedDomain}
            onChange={handleDomainChange}
            name="selectedDomain"
          >
            <option value="">Sélectionnez une profession</option>
            {domain.domaines && domain.domaines.map((domaine, index) => (
              <option key={index} value={domaine.id_domaine}>
                {domaine.nom_domaine}
              </option>
            ))}
          </select>

          <div className="input-field-container">
            {filteredSpecialites && filteredSpecialites.map((specialite, index) => (
              <div key={index}>
                <input
                  type="checkbox"
                  id={`specialite-${index}`}
                  name={specialite.nom_specialite}
                  onChange={handleSpecialtyChange}
                  checked={specialties.includes(specialite.nom_specialite)}
                />
                <label htmlFor={`specialite-${index}`}>{specialite.nom_specialite}</label>
              </div>
            ))}
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
