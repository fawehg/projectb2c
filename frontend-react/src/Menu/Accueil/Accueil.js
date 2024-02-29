import React from 'react';
import './Accueil.css'; // Import the CSS file
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import { Link } from 'react-router-dom'; 
import Client from '../../Clients/Client.js';

const Accueil = () => {
  return (
    
      <div className="accueil-container">
        <Header/>
        <nav className="nav-container">
          <div className="client">
            <img src="client.png" alt="Client" />
            <Link  to="/Client"><button className='cher-client'>cher-client</button></Link>
          </div>
          <div className="ouvrier">
            <img src="OUV.png" alt="Ouvrier" />
            <Link    to="/Ouvrier">< button className='cher-ouvrier'>cher-ouvrier</button></Link>
          </div>
        </nav>
        <div className="phrases-container">
          <div className="phrase-card">
            <img src="target.png" alt="Target" />
            <p>DÉFINISSEZ VOTRE URGENCE EN 1 MINUTE</p>
          </div>
          <div className="phrase-card">
            <img src="link.png" alt="Link" />
            <p>NOUS RECHERCHONS IMMÉDIATEMENT DES PROFESSIONNELS DISPONIBLES</p>
          </div>
          <div className="phrase-card">
            <img src="people.png" alt="People" />
            <p>NOUS VOUS RECOMMANDONS LE MEILLEUR PRO AU MEILLEUR PRIX</p>
          </div>
          <div className="phrase-card">
            <img src="bussiness.png" alt="Business" />
            <p>VOUS VALIDEZ SON INTERVENTION EN 1 CLIC</p>
          </div>
        </div>
       <Footer/>
      </div>
    
  );
};

export default Accueil;
