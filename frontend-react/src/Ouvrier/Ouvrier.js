import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faMapMarkerAlt, faAddressCard, faLock } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './Ouvrier.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const Ouvrier = () => {
  const [domain, setDomain] = useState({});
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [ville, setVille] = useState('');
  const [adresse, setAdresse] = useState('');
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
    console.log(domainData);
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
    console.log(`Checkbox ${name} checked: ${checked}`);
    
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

  const validateForm = () => {
    const errors = {};

    if (!nom.trim()) errors.nom = 'Veuillez saisir votre nom';
    if (!prenom.trim()) errors.prenom = 'Veuillez saisir votre prénom';
    if (!email.trim()) errors.email = 'Veuillez saisir votre adresse e-mail';
    if (!ville.trim()) errors.ville = 'Veuillez saisir votre ville';
    if (!adresse.trim()) errors.adresse = 'Veuillez saisir votre adresse';
    if (!password.trim()) errors.password = 'Veuillez saisir votre mot de passe';
    if (!confirmationMotDePasse.trim()) errors.confirmationMotDePasse = 'Veuillez confirmer votre mot de passe';
    if (!profession.trim()) errors.profession = 'Saisie votre profession';

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const navigate = useNavigate();

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    const formData = new FormData();
    formData.append('nom', nom);
    formData.append('prenom', prenom);
    formData.append('email', email);
    formData.append('ville', ville);
    formData.append('adresse', adresse);
    formData.append('password', password);
    formData.append('confirmationMotDePasse', confirmationMotDePasse);
    formData.append('profession', profession);
    formData.append('specialties', JSON.stringify(specialties));
    formData.append('joursDisponibilite', JSON.stringify(joursDisponibilite));
    formData.append('heureDebut', heureDebut);
    formData.append('heureFin', heureFin);
    formData.append('image', image);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/ouvrier/register`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      if (response.status === 200) {
        console.log(response.data);
        localStorage.setItem('token', response.data.token);
      }
    } catch (error) {
      console.error('Erreur lors de la requête :', error);
    }
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/ouvrier/login`, {
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/profil-ouvrier');
      } else {
        console.error('Token not found in response:', response.data);
      }
    } catch (error) {
      console.error('Erreur lors de la requête :', error);
    }
  };

  const handleSignUpClick = () => {
    const container = document.getElementById('container');
    container.classList.add('right-panel-active');
  };

  const handleSignInClick = () => {
    const container = document.getElementById('container');
    container.classList.remove('right-panel-active');
  };

  return (
    <div>
      <Header />
      <div className="container" id="container">
        <div className="form-container sign-up-container">
          <form onSubmit={handleSubmitRegister}>
            <h1>Créer un compte</h1>
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
                placeholder="Adresse"
                name="adresse"
                value={adresse}
                onChange={e => setAdresse(e.target.value)}
              />
              {errors.adresse && <p className="error-message">{errors.adresse}</p>}
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
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>

            <button type="submit">S'inscrire</button>
          </form>
        </div>

        <div className="form-container sign-in-container">
          <form onSubmit={handleSubmitLogin}>
            <h1>Connexion</h1>
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
            </div>
            <Link to="/mot-de-passe-oublie">Mot de passe Oublié?</Link>
            <button type="submit">Connexion</button>
          </form>
        </div>

        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Bienvenue !</h1>
              <p>Pour rester en contact avec nous, veuillez vous connecter avec vos informations personnelles</p>
              <button className="ghost" onClick={handleSignInClick}>Connexion</button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Cher Ouvrier</h1>
              <p>Entrez vos informations personnelles et commencez votre voyage de recherche avec nous</p>
              <button className="ghost" onClick={handleSignUpClick}>Inscription</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Ouvrier;
