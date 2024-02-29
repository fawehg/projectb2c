import React from 'react';
import { Link } from 'react-router-dom';
import './Client.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import RechercheOuvrier from'./RechercheOuvrier/RechercheOuvrier';
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
      errors: {}
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
        const response = await fetch('http://localhost:8000/api/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.state),
        });
        if (response.ok) {
          console.log('Inscription réussie !');
          // Redirection vers la page suivante après inscription réussie
          this.props.history.push('/RechercheOuvrier');
        } else {
          console.error('Erreur lors de l\'inscription');
        }
      } catch (error) {
        console.error('Erreur lors de la requête :', error);
      }
    } else {
      this.setState({ errors });
    }
  }

  handleSubmitSignin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
        }),
      });
      if (response.ok) {
        console.log('Connexion réussie !');
        // Redirection vers la page suivante après connexion réussie
        this.props.history.push('/RechercheOuvrier');
      } else {
        console.error('Erreur lors de la connexion');
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
    // Ajoutez des conditions de validation pour d'autres champs ici
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
              <input
                className="input-field"
                type="text"
                placeholder="Nom"
                name="nom"
                value={this.state.nom}
                onChange={this.handleChange}
              />
              <input
                className="input-field"
                type="text"
                placeholder="Prénom"
                name="prenom"
                value={this.state.prenom}
                onChange={this.handleChange}
              />
              <input
                className="input-field"
                type="text"
                placeholder="Ville"
                name="ville"
                value={this.state.ville}
                onChange={this.handleChange}
              />
              <input
                className="input-field"
                type="text"
                placeholder="Adresse"
                name="adresse"
                value={this.state.adresse}
                onChange={this.handleChange}
              />
              <input
                className="input-field"
                type="email"
                placeholder="Email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
              <input
                className="input-field"
                type="password"
                placeholder="Mot de passe"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
              <input
                className="input-field"
                type="password"
                placeholder="Confirmation du mot de passe"
                name="confirmationMotDePasse"
                value={this.state.confirmationMotDePasse}
                onChange={this.handleChange}
              />
              <button type="submit">Inscription</button>
            </form>
          </div>

          <div className="form-container sign-in-container">
            <form onSubmit={this.handleSubmitSignin}>
              <h1>Connexion</h1>
              <input
                className="input-field"
                type="email"
                placeholder="Email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
              <input
                className="input-field"
                type="password"
                placeholder="Mot de passe"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
              <Link to='/RechercheOuvrier'><button type="submit" >Connexion</button></Link>
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
