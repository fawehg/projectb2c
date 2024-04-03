import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faMapMarkerAlt, faAddressCard, faLock } from '@fortawesome/free-solid-svg-icons';
import './Ouvrier.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import axios from 'axios';

const Ouvrier = () => {
  const [state, setState] = useState({
    nom: '',
    prenom: '',
    email: '',
    ville: '',
    adresse: '',
    password: '',
    confirmationMotDePasse: '',
    profession: [],
    specialties: [],
    joursDisponibilite: [],
    heureDebut: '',
    heureFin: '',
    errors: {},
    domaines: [],
    specialites: [],
    selectedDomain: '',
  });



  useEffect(() => {
    const fetchData = async () => {
      try {
        const [domainesResponse, specialitesResponse] = await Promise.all([
          axios.get(`${process.env.REACT_APP_API_URL}/domaines`),
          axios.get(`${process.env.REACT_APP_API_URL}/specialites`),
        ]);

        setState(prevState => ({
          ...prevState,
          domaines: domainesResponse.data || [],
          specialites: specialitesResponse.data || [],
        }));
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleDomainChange = (event) => {
    const selectedDomain = event.target.value;
    setState(prevState => ({
      ...prevState,
      selectedDomain,
      specialties: [],
      filteredSpecialites: prevState.domaines.find(domaine => domaine.id_domaine === parseInt(selectedDomain))?.specialites || [],
    }));
  };

  const handleSpecialtyChange = (e) => {
    const specialty = e.target.value;
    const { specialties } = state;
    setState(prevState => ({
      ...prevState,
      specialties: specialties.includes(specialty) ? specialties.filter(item => item !== specialty) : [...specialties, specialty]
    }));
  };

  const handleAvailabilityChange = (e) => {
    const day = e.target.value;
    setState(prevState => ({
      ...prevState,
      joursDisponibilite: prevState.joursDisponibilite.includes(day) ? prevState.joursDisponibilite.filter(item => item !== day) : [...prevState.joursDisponibilite, day]
    }));
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setState(prevState => ({
      ...prevState,
      image: imageFile,
    }));
  };
  const navigate = useNavigate();
  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    const errors = validateForm();  // Changed from this.validateForm()
    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/ouvrier/register`, 
          JSON.stringify(state),  // Changed from this.state
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        console.log(response.data); 
        if (response.data.token) { 
          localStorage.setItem('token', response.data.token);
          navigate('/ProfilOuvrier');  // Changed from this.props.history.push
        } else {
          console.error('Token not found in response:', response.data);
        }
      } catch (error) {
        console.error('Erreur lors de la requête :', error);
      }
    } else {
      setState({ ...state, errors });  // Changed from this.setState
    }
  }
  

  const handleSubmitLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/ouvrier/login`, {
        email: state.email,
        password: state.password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      handleResponse(response);
    } catch (error) {
      console.error('Erreur lors de la requête :', error);
    }
  };

  const handleResponse = (response) => {
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      navigate('/profil-ouvrier');
    } else {
      console.error('Token not found in response:', response.data);
    }
  };

  const validateForm = () => {
    const errors = {};
    const { nom, prenom, email, ville, adresse, password, confirmationMotDePasse, profession } = state;

    if (!nom.trim()) errors.nom = 'Veuillez saisir votre nom';
    if (!prenom.trim()) errors.prenom = 'Veuillez saisir votre prénom';
    if (!email.trim()) errors.email = 'Veuillez saisir votre adresse e-mail';
    if (!ville.trim()) errors.ville = 'Veuillez saisir votre ville';
    if (!adresse.trim()) errors.adresse = 'Veuillez saisir votre adresse';
    if (!password.trim()) errors.password = 'Veuillez saisir votre mot de passe';
    if (!confirmationMotDePasse.trim()) errors.confirmationMotDePasse = 'Veuillez confirmer votre mot de passe';
    if (!profession || profession.length === 0) errors.profession = 'Veuillez sélectionner votre profession';

    return errors;
  };

  const handleSignUpClick = () => {
    const container = document.getElementById('container');
    container.classList.add('right-panel-active');
  };

  const handleSignInClick = () => {
    const container = document.getElementById('container');
    container.classList.remove('right-panel-active');
  };

  const filteredSpecialites = state.domaines.find(domaine => domaine.nom_domaine === state.selectedDomain)?.specialites || [];

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
                value={state.nom}
                onChange={handleChange}
              />
            </div>
            <div className="input-field-container">
              <FontAwesomeIcon icon
              ={faUser} className="icon" />
<input
  className="input-field"
  type="text"
  placeholder="Prénom"
  name="prenom"
  value={state.prenom}
  onChange={handleChange}
/>
</div>
<div className="input-field-container">
<FontAwesomeIcon icon={faEnvelope} className="icon" />
<input
  className="input-field"
  type="email"
  placeholder="Email"
  name="email"
  value={state.email}
  onChange={handleChange}
/>
</div>
<div className="input-field-container">
<FontAwesomeIcon icon={faMapMarkerAlt} className="icon" />
<input
  className="input-field"
  type="text"
  placeholder="Ville"
  name="ville"
  value={state.ville}
  onChange={handleChange}
/>
</div>
<div className="input-field-container">
<FontAwesomeIcon icon={faAddressCard} className="icon" />
<input
  className="input-field"
  type="text"
  placeholder="Adresse"
  name="adresse"
  value={state.adresse}
  onChange={handleChange}
/>
</div>
<div className="input-field-container">
<FontAwesomeIcon icon={faLock} className="icon" />
<input
  className="input-field"
  type="password"
  placeholder="Mot de passe"
  name="password"
  value={state.password}
  onChange={handleChange}
/>
</div>
<div className="input-field-container">
<FontAwesomeIcon icon={faLock} className="icon" />
<input
  className="input-field"
  type="password"
  placeholder="Confirmation du mot de passe"
  name="confirmationMotDePasse"
  value={state.confirmationMotDePasse}
  onChange={handleChange}
/>
</div>

<select
className="input-field"
value={state.selectedDomain}
onChange={handleDomainChange}
name="profession"
>
<option value="">Sélectionnez une profession</option>
{state.domaines && state.domaines.map((domaine, index) => (
  <option key={index} value={domaine.id_domaine}>{domaine.nom_domaine}</option>
))}
</select>

<div>
              {filteredSpecialites && filteredSpecialites.map((specialite, index) => (
                <div key={index}>
                  <input
                    type="checkbox"
                    id={specialite.id_specialites}
                    value={specialite.nom_specialites}
                    onChange={handleSpecialtyChange}
                    checked={state.specialties.includes(specialite.nom_specialites)}
                  />
                  <label>{specialite.nom_specialites}</label>
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
      checked={state.joursDisponibilite ? state.joursDisponibilite.includes(day) : false}
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
  value={state.heureDebut}
  onChange={handleChange}
/>
<label htmlFor="heureFin">Heure de Fin:</label>
<input
  className="input-field"
  type="time"
  placeholder="Heure de fin"
  name="heureFin"
  value={state.heureFin}
  onChange={handleChange}
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
  value={state.email}
  onChange={handleChange}
/>
</div>
<div className="input-field-container">
<FontAwesomeIcon icon={faLock} className="icon" />
<input
  className="input-field"
  type="password"
  placeholder="Mot de passe"
  name="password"
  value={state.password}
  onChange={handleChange}
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
}

export default Ouvrier;
