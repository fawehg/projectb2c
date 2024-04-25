import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Client.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { FaUser, FaEnvelope, FaLock, FaMapMarkerAlt } from 'react-icons/fa'; 
import axios from 'axios';

const Client = () => {
  const [state, setState] = useState({
    nom: '',
    prenom: '',
    ville: '',
    adresse: '',
    email: '',
    password: '',
    confirmationMotDePasse: '',
    errors: {
      nom: '',
      prenom: '',
      ville: '',
      adresse: '',
      email: '',
      password: '',
      confirmationMotDePasse: '',
    },
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitSignup = async (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/client/register`,
          state,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        
        localStorage.setItem('token', response.data.ResultData.token);
        navigate('/recherche-ouvrier');
      } catch (error) {
        console.error('Erreur lors de la requête :', error);
      }
    }
  };

  const handleSubmitSignin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/client/login`,
        state,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log(response.data.ResultData.token);
      localStorage.setItem('token', response.data.ResultData.token);
      navigate('/recherche-ouvrier');
    } catch (error) {
      console.error('Erreur lors de la requête :', error);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (state.nom.trim() === '') {
      errors.nom = 'Veuillez saisir votre nom';
    }
    if (state.prenom.trim() === '') {
      errors.prenom = 'Veuillez saisir votre prénom';
    }
    if (state.ville.trim() === '') {
      errors.ville = 'Veuillez saisir votre ville';
    }
    if (state.adresse.trim() === '') {
      errors.adresse = 'Veuillez saisir votre adresse';
    }
    if (state.email.trim() === '') {
      errors.email = 'Veuillez saisir votre email';
    }
    if (state.password.trim() === '') {
      errors.password = 'Veuillez saisir votre mot de passe';
    }
    if (state.confirmationMotDePasse.trim() === '') {
      errors.confirmationMotDePasse = 'Veuillez confirmer votre mot de passe';
    } else if (state.password !== state.confirmationMotDePasse) {
      errors.confirmationMotDePasse = 'Les mots de passe ne correspondent pas';
    }
    setState({ ...state, errors });
    return errors;
  };

  const handleSignUpClick = () => {
    const container = document.getElementById('container');
    if (container) {
      container.classList.add('right-panel-active');
    }
  };

  const handleSignInClick = () => {
    const container = document.getElementById('container');
    if (container) {
      container.classList.remove('right-panel-active');
    }
  };

  const { errors } = state;

  return (
    <div>
      <Header />
      <div className="container" id="container">
        <div className="form-container sign-up-container">
          <form onSubmit={handleSubmitSignup}>
            <h1>Créer un compte</h1>
            <div className="input-container">
              <FaUser className="icon" />
              <input
                className="input-field"
                type="text"
                placeholder="Nom"
                name="nom"
                value={state.nom}
                onChange={handleChange}
              />
            </div>
            {errors.nom && <span className="error">{errors.nom}</span>}
            <div className="input-container">
              <FaUser className="icon" />
              <input
                className="input-field"
                type="text"
                placeholder="Prénom"
                name="prenom"
                value={state.prenom}
                onChange={handleChange}
              />
            </div>
            {errors.prenom && <span className="error">{errors.prenom}</span>}
            <div className="input-container">
              <FaMapMarkerAlt className="icon" />
              <input
                className="input-field"
                type="text"
                placeholder="Ville"
                name="ville"
                value={state.ville}
                onChange={handleChange}
              />
            </div>
            {errors.ville && <span className="error">{errors.ville}</span>}
            <div className="input-container">
              <FaMapMarkerAlt className="icon" />
              <input
                className="input-field"
                type="text"
                placeholder="Adresse"
                name="adresse"
                value={state.adresse}
                onChange={handleChange}
              />
            </div>
            {errors.adresse && <span className="error">{errors.adresse}</span>}
            <div className="input-container">
              <FaEnvelope className="icon" />
              <input
                className="input-field"
                type="email"
                placeholder="Email"
                name="email"
                value={state.email}
                onChange={handleChange}
              />
            </div>
            {errors.email && <span className="error">{errors.email}</span>}
            <div className="input-container">
              <FaLock className="icon" />
              <input
                className="input-field"
                type="password"
                placeholder="Mot de passe"
                name="password"
                value={state.password}
                onChange={handleChange}
              />
            </div>
            {errors.password && <span className="error">{errors.password}</span>}
            <div className="input-container">
              <FaLock className="icon" />
              <input
                className="input-field"
                type="password"
                placeholder="Confirmation du mot de passe"
                name="confirmationMotDePasse"
                value={state.confirmationMotDePasse}
                onChange={handleChange}
              />
            </div>
            {errors.confirmationMotDePasse && <span className="error">{errors.confirmationMotDePasse}</span>}
            <button className='Auth' type="submit">Inscription</button>
          </form>
        </div>

        <div className="form-container sign-in-container">
          <form onSubmit={handleSubmitSignin}>
            <h1>Connexion</h1>
            <div className="input-container">
              <FaEnvelope className="icon" />
              <input
                className="input-field"
                type="email"
                placeholder="Email"
                name="email"
                value={state.email}
                onChange={handleChange}
              />
            </div>
            <div className="input-container">
              <FaLock className="icon" />
              <input
                className="input-field"
                type="password"
                placeholder="Mot de passe"
                name="password"
                value={state.password}
                onChange={handleChange}
              />
            </div>
            <button className='Auth' type="submit">Connexion</button>
            <Link to="#">Mot de passe Oublié?</Link>
          </form>
        </div>

        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Bienvenue !</h1>
              <p>Pour rester en contact avec nous, veuillez vous connecter avec vos informations personnelles</p>
              <button className="ghost" onClick={handleSignInClick}>Sign In</button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Cher Client</h1>
              <p>Entrez vos informations personnelles et commencez votre voyage de recherche avec nous</p>
              <button className="ghost" onClick={handleSignUpClick}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Client;
