import React from 'react';
import { Link ,Navigate} from 'react-router-dom';
import './Ouvrier.css';
import ProfilOuvrier from './ProfilOuvrier/ProfilOuvrier';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MotDePasseOublie from '../MDPoubliée/MDPoubliée';


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
      profession: '', 
      specialties: [], 
      joursDisponibilite: [],
      heureDebut: '',
      heureFin: '',
    
      errors: {}
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSpecialtyChange = (e) => {
    const specialty = e.target.value;
    const { specialties } = this.state;
    if (specialties.includes(specialty)) {
      this.setState({
        specialties: specialties.filter(item => item !== specialty)
      });
    } else {
      this.setState({
        specialties: [...specialties, specialty]
      });
    }
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
  handleSubmitRegister = async (e) => {
   
    e.preventDefault();
    const errors = this.validateForm();
    if (Object.keys(errors).length === 0) {
        try {
            const response = await fetch('http://localhost:8000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.state),
            });
            if (response.ok) {
              Navigate('/ProfilOuvrier');
              console.log('Connexion réussie !');
             
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

handleSubmitLogin = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
            }),
        });
        const data = await response.json();
        if (response.ok) {
            console.log('Connexion réussie !');
            Navigate('/ProfilOuvrier');        } 
            else {
            console.error('Erreur lors de la connexion :', data.message);
        }
    } catch (error) {
        console.error('Erreur lors de la requête :', error);
    }
}

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
    const professionsWithSpecialties = {
      Maçon: ['Mur endommagé', 'Fondation fissurée', 'Béton dégradé'],
      Charpentier: ['Toiture endommagée', 'Charpente affaissée', 'Isolation défectueuse'],
      Électricien: ['Court-circuit', 'Problème de câblage', 'Panne de prise de courant'],
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

    return (
      <div>
        <Header />
        <div className="container" id="container">
          <div className="form-container sign-up-container">
            <form onSubmit={this.handleSubmit}>
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
              <select
                className="input-field"
                value={this.state.profession}
                onChange={this.handleChange}
                name="profession"
              >
                <option value="">Sélectionnez une profession</option>
                <option value="Maçon">Maçon</option>
                <option value="Charpentier">Charpentier</option>
                <option value="Électricien">Électricien</option>
                <option value="Plombier">Plombier</option>
                <option value="Peintre">Peintre</option>
                <option value="Menuisier">Menuisier</option>
                <option value="Carreleur">Carreleur</option>
                <option value="Couvreur">Couvreur</option>
                <option value="Plâtrier">Plâtrier</option>
                <option value="Ferronnier">Ferronnier</option>
                <option value="Installateur HVAC">Installateur HVAC</option>
                <option value="Jardinier / Paysagiste">Jardinier / Paysagiste</option>
              </select>
              <div>
                {this.state.profession && professionsWithSpecialties[this.state.profession].map((specialty, index) => (
                  <label key={index}>
                    <input
                      type="checkbox"
                      value={specialty}
                      checked={this.state.specialties.includes(specialty)}
                      onChange={this.handleSpecialtyChange}
                    />
                    {specialty}
                  </label>
                ))}
              </div>
              <div>
                <h3>Jours de disponibilité :</h3>
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
              <input
                className="input-field"
                type="time"
                placeholder="Heure de début"
                name="heureDebut"
                value={this.state.heureDebut}
                onChange={this.handleChange}
              />
              <input
                className="input-field"
                type="time"
                placeholder="Heure de fin"
                name="heureFin"
                value={this.state.heureFin}
                onChange={this.handleChange}
              />
              <Link to ="/ProfilOuvrier" ><button type="submit" onClick={this.handleSubmitRegister}>S'inscrire</button></Link>
            </form>
          </div>

          <div className="form-container sign-in-container">
            <form>
              <h1>Connexion</h1>
              <input className="input-field" type="email" placeholder="Email" />
              <input className="input-field" type="password" placeholder="Mot de passe" />
              <Link to="/MotDePasseOublie">Mot de passe Oublié?</Link>
              <Link to ="//ProfilOuvrier" ><button type="submit" onClick={this.handleSubmitLogin}>Connexion</button></Link>
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
