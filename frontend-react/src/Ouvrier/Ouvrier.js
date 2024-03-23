import React from 'react';
import { Link,useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faMapMarkerAlt, faAddressCard, faLock, faBriefcase, faCalendarAlt, faClock } from '@fortawesome/free-solid-svg-icons';
import './Ouvrier.css';
import ProfilOuvrier from './ProfilOuvrier/ProfilOuvrier';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MotDePasseOublie from '../MDPoubliée/MDPoubliée';
import axios from 'axios';

class Ouvrier extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      errors: {}
    };
  }
  componentDidMount() {
    axios.get(`${process.env.REACT_APP_API_URL}/domaines`)
      .then(response => {
        this.setState({ domaines: response.data || [] });
      })
      ;
      axios.get(`${process.env.REACT_APP_API_URL}/specialites`)
      .then(response => {
        this.setState({ specialites: response.data || [] });
      })
      ;
      
  }
  handleDomainChange = (event) => {
    this.setState({ selectedDomain: event.target.value });
    this.setState({ selectedSpecialite: '' }); 
  };
  

  handleSpecialtyChange = (e) => {
    const specialty = e.target.value;
    const { selectedDomain, domaines } = this.state;
    const selectedDomainObj = domaines.find(domain => domain.nom_domaine === selectedDomain);
    if (selectedDomainObj.specialites.includes(specialty)) {
      this.setState(prevState => ({
        specialties: prevState.specialties.filter(item => item !== specialty)
      }));
    } else {
      this.setState(prevState => ({
        specialties: [...prevState.specialties, specialty]
      }));
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
    
  }

  handleAvailabilityChange = (e) => {
    const day = e.target.value;
    const { joursDisponibilite } = this.state;
    if (joursDisponibilite.includes(day)) {
      this.setState({
        joursDisponibilite: joursDisponibilite.filter(item => item !== day)
      });
    } else {
      this.setState({
        joursDisponibilite: [...joursDisponibilite, day]
      });
    }
  }
  
  FilteredSpecialites = () => {
    const { domaines, selectedDomain } = this.state;
    return domaines
    
      .find(domaine => domaine.nom_domaine === selectedDomain)
      ?.specialites || [];
  }
  
  
  handleSubmitRegister = async (e) => {
    e.preventDefault();
    const errors = this.validateForm();
    if (Object.keys(errors).length === 0) {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/ouvrier/register`, 
                JSON.stringify(this.state),
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }    
            );
            console.log(response.data); 
            if (response.data.token) { 
                localStorage.setItem('token', response.data.token);
                this.navigate('/ProfilOuvrier'); 
            } else {
                console.error('Token not found in response:', response.data);
            }
        } catch (error) {
            console.error('Erreur lors de la requête :', error);
        }
    } else {
        this.setState({ errors });
    }
}


  handleSubmitLogin = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/ouvrier/login`,
            {
                email: this.state.email,
                password: this.state.password,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log(response.data);
        if (response.status === 200) {
            localStorage.setItem('token', response.data.token);
            this.navigate('/ProfilOuvrier');
            console.log('Connexion réussie');
        } else {
            console.error('Erreur lors de la connexion :', response.data.message);
        }
    } catch (error) {
        console.error('Erreur lors de la requête :', error);
    }
};

  validateForm = () => {
    const errors = {};
    
    // Vérification des champs obligatoires
    if (this.state.nom.trim() === '') {
      errors.nom = 'Veuillez saisir votre nom';
    }
    if (this.state.prenom.trim() === '') {
      errors.prenom = 'Veuillez saisir votre prénom';
    }
    if (this.state.email.trim() === '') {
      errors.email = 'Veuillez saisir votre adresse e-mail';
    }
    if (this.state.ville.trim() === '') {
      errors.ville = 'Veuillez saisir votre ville';
    }
    if (this.state.adresse.trim() === '') {
      errors.adresse = 'Veuillez saisir votre adresse';
    }
    if (this.state.password.trim() === '') {
      errors.password = 'Veuillez saisir votre mot de passe';
    }
    if (this.state.confirmationMotDePasse.trim() === '') {
      errors.confirmationMotDePasse = 'Veuillez confirmer votre mot de passe';
    }
    if (this.state.profession.trim() === '') {
      errors.profession = 'Veuillez sélectionner votre profession';
    }
    
    return errors;
  }

  handleSignUpClick = () => {
    const container = document.getElementById('container');
    container.classList.add('right-panel-active');
  }

  handleSignInClick = () => {
    const container = document.getElementById('container');
    container.classList.remove('right-panel-active');
  }

  render() {
    const { errors } = this.state;

    // Définir les spécialités pour chaque profession
  

    return (
      <div>
        <Header />
        <div className="container" id="container">
          <div className="form-container sign-up-container">
            <form onSubmit={this.handleSubmit}>
              <h1>Créer un compte</h1>
              <div className="input-field-container">
                <FontAwesomeIcon icon={faUser} className="icon" />
                <input
                  className="input-field"
                  type="text"
                  placeholder="Nom"
                  name="nom"
                  value={this.state.nom}
                  onChange={this.handleChange}
                />
              </div>
              <div className="input-field-container">
                <FontAwesomeIcon icon={faUser} className="icon" />
                <input
                  className="input-field"
                  type="text"
                  placeholder="Prénom"
                  name="prenom"
                  value={this.state.prenom}
                  onChange={this.handleChange}
                />
              </div>
              <div className="input-field-container">
                <FontAwesomeIcon icon={faEnvelope} className="icon" />
                <input
                  className="input-field"
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </div>
              <div className="input-field-container">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="icon" />
                <input
                  className="input-field"
                  type="text"
                  placeholder="Ville"
                  name="ville"
                  value={this.state.ville}
                  onChange={this.handleChange}
                />
              </div>
              <div className="input-field-container">
                <FontAwesomeIcon icon={faAddressCard} className="icon" />
                <input
                  className="input-field"
                  type="text"
                  placeholder="Adresse"
                  name="adresse"
                  value={this.state.adresse}
                  onChange={this.handleChange}
                />
              </div>
              <div className="input-field-container">
                <FontAwesomeIcon icon={faLock} className="icon" />
                <input
                  className="input-field"
                  type="password"
                  placeholder="Mot de passe"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </div>
              <div className="input-field-container">
                <FontAwesomeIcon icon={faLock} className="icon" />
                <input
                  className="input-field"
                  type="password"
                  placeholder="Confirmation du mot de passe"
                  name="confirmationMotDePasse"
                  value={this.state.confirmationMotDePasse}
                  onChange={this.handleChange}
                />
              </div>
              
              <select
              className="input-field"
              value={this.state.domaines}
              onChange={this.handleChange}
               name="profession">
               <option value="">Sélectionnez une profession</option>
               {this.state.domaines && this.state.domaines.map((domaines, index) => (
                   <option key={index} value={domaines.id_domaine}>{domaines.nom_domaine}</option>

            )
            )}
           </select>
           <div>
  <h1>Liste des spécialités par domaine</h1>
  {this.statefilteredSpecialites && this.state.filteredSpecialites.map((specialite, index) => (
    <div key={index}>
      <input
        type="checkbox"
        id={specialite.id_specialites}
        value={specialite.nom_specialites}
        onChange={this.handleSpecialtyChange}
        checked={this.state.specialties.includes(specialite.nom_specialites)}
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
                      checked={this.state.joursDisponibilite ? this.state.joursDisponibilite.includes(day) : false}
                      onChange={this.handleAvailabilityChange}
                    />
                    {day}
                  </label>
                ))}
              </div>
              <div className="input-field-container">
              <label htmlFor="datedebut">Heure de début:</label>
                <input
                  className="input-field"
                  type="time"
                  placeholder="Heure de début"
                  name="heureDebut"
                  value={this.state.heureDebut}
                  onChange={this.handleChange}
                />
              <label htmlFor="datedebut">Heure de Fin:</label>
                <input
                  className="input-field"
                  type="time"
                  placeholder="Heure de fin"
                  name="heureFin"
                  value={this.state.heureFin}
                  onChange={this.handleChange}
                />
              </div>
              <button type="submit" onClick={this.handleSubmitRegister}>S'inscrire</button>
            </form>
          </div>

          <div className="form-container sign-in-container">
            <form>
              <h1>Connexion</h1>
              <div className="input-field-container">
                <FontAwesomeIcon icon={faEnvelope} className="icon" />
                <input className="input-field" type="email" placeholder="Email" />
              </div>
              <div className="input-field-container">
                <FontAwesomeIcon icon={faLock} className="icon" />
                <input className="input-field" type="password" placeholder="Mot de passe" />
              </div>
              <Link to="/MotDePasseOublie">Mot de passe Oublié?</Link>
              <button type="submit" onClick={this.handleSubmitLogin}>Connexion</button>
            </form>
          </div>

          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Bienvenue !</h1>
                <p>Pour rester en contact avec nous, veuillez vous connecter avec vos informations personnelles</p>
                <button className="ghost" onClick={this.handleSignInClick}>Connexion</button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Cher Ouvrier</h1>
                <p>Entrez vos informations personnelles et commencez votre voyage de recherche avec nous</p>
                <button className="ghost" onClick={this.handleSignUpClick}>Inscription</button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Ouvrier;
