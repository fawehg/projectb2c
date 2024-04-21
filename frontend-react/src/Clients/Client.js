import React from 'react';
import { Link } from 'react-router-dom';
import './Client.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { FaUser, FaEnvelope, FaLock, FaMapMarkerAlt } from 'react-icons/fa'; 
import axios from 'axios';

class Client extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      redirect: false
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
 
  handleSubmitSignup = async (e) => {
    e.preventDefault();
    const errors = this.validateForm();
    
    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/client/register`, 
          this.state,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        if (response.status === 200) {
          this.props.navigate('/recherche-ouvrier');
          localStorage.setItem('token', response.data.token);
        }   
      } catch (error) {
        console.error('Erreur lors de la requête :', error);
      }
    } 
  }

  handleSubmitSignin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/client/login`, 
          this.state,
          {
              headers: {
                  'Content-Type': 'application/json',
              },
          }
      );
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        this.props.navigate('/recherche-ouvrier');
      } 
    } catch (error) {
      console.error('Erreur lors de la requête :', error);
    }
  }

  validateForm = () => {
    const errors = {};
    if (this.state.nom.trim() === '') {
      errors.nom = 'Veuillez saisir votre nom';
    }
    if (this.state.prenom.trim() === '') {
      errors.prenom = 'Veuillez saisir votre prénom';
    }
    if (this.state.ville.trim() === '') {
      errors.ville = 'Veuillez saisir votre ville';
    }
    if (this.state.adresse.trim() === '') {
      errors.adresse = 'Veuillez saisir votre adresse';
    }
    if (this.state.email.trim() === '') {
      errors.email = 'Veuillez saisir votre email';
    }
    if (this.state.password.trim() === '') {
      errors.password = 'Veuillez saisir votre mot de passe';
    }
    if (this.state.confirmationMotDePasse.trim() === '') {
      errors.confirmationMotDePasse = 'Veuillez confirmer votre mot de passe';
    } else if (this.state.password !== this.state.confirmationMotDePasse) {
      errors.confirmationMotDePasse = 'Les mots de passe ne correspondent pas';
    }
    return errors;
  }

  handleSignUpClick = () => {
    const container = document.getElementById('container');
    if (container) {
      container.classList.add('right-panel-active');
    }
  }

  handleSignInClick = () => {
    const container = document.getElementById('container');
    if (container) {
      container.classList.remove('right-panel-active');
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <div>
        <Header />
        <div className="container" id="container">
          <div className="form-container sign-up-container">
            <form onSubmit={this.handleSubmitSignup}>
              <h1>Créer un compte</h1>
              <div className="input-container">
                <FaUser className="icon" />
                <input
                  className="input-field"
                  type="text"
                  placeholder="Nom"
                  name="nom"
                  value={this.state.nom}
                  onChange={this.handleChange}
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
                  value={this.state.prenom}
                  onChange={this.handleChange}
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
                  value={this.state.ville}
                  onChange={this.handleChange}
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
                  value={this.state.adresse}
                  onChange={this.handleChange}
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
                  value={this.state.email}
                  onChange={this.handleChange}
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
                  value={this.state.password}
                  onChange={this.handleChange}
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
                  value={this.state.confirmationMotDePasse}
                  onChange={this.handleChange}
                />
              </div>
              {errors.confirmationMotDePasse && <span className="error">{errors.confirmationMotDePasse}</span>}
              <button className='Auth' type="submit">Inscription</button>
            </form>
          </div>

          <div className="form-container sign-in-container">
            <form onSubmit={this.handleSubmitSignin}>
              <h1>Connexion</h1>
              <div className="input-container">
                <FaEnvelope className="icon" />
                <input
                  className="input-field"
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
                {errors.email && <span className="error">{errors.email}</span>}
              </div>
              <div className="input-container">
                <FaLock className="icon" />
                <input
                  className="input-field"
                  type="password"
                  placeholder="Mot de passe"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </div>
              {errors.password && <span className="error">{errors.password}</span>}
              <button className='Auth' type="submit">Connexion</button>
              <Link to="#">Mot de passe Oublié?</Link>
            </form>
          </div>

          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Bienvenue !</h1>
                <p>Pour rester en contact avec nous, veuillez vous connecter avec vos informations personnelles</p>
                <button className="ghost" onClick={this.handleSignInClick}>Sign In</button>
              </div>    
              <div className="overlay-panel overlay-right">
                <h1>Cher Client</h1>
                <p>Entrez vos informations personnelles et commencez votre voyage de recherche avec nous</p>
                <button className="ghost" onClick={this.handleSignUpClick}>Sign Up</button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
export default Client;
