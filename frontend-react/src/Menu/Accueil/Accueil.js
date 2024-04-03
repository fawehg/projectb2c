import React from 'react';
import './Accueil.css'; 
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import { Link } from 'react-router-dom'; 
const Accueil = () => {
  return (
    
      <div className="accueil-container">
        <Header/>
        <nav className="nav-container">
          <div className="client">
            <img src="client.png" alt="Client" />
            <Link  to="/Client"><button className='cher-client'>Cher Client</button></Link>
          </div>
          <div className="ouvrier">
            <img src="OUV.png" alt="Ouvrier" />
            <Link    to="/Ouvrier">< button className='cher-ouvrier'>Cher Ouvrier</button></Link>
          </div>
        </nav>
        <div className="phrases-container">
          <div className="phrase-card">
            <img src="target.png" alt="Target" />
            <p >Précisez votre urgence en une minute</p>
          </div>
          <div className="phrase-card">
            <img src="link.png" alt="Link" />
            <p>Besoin de professionnels disponibles immédiatement</p>
          </div>
          <div className="phrase-card">
            <img src="people.png" alt="People" />
            <p>Nous recommandons les meilleurs professionnels pour vous</p>
          </div>
          <div className="phrase-card">
            <img src="bussiness.png" alt="Business" />
            <p>Une validation simple, en un clic</p>
          </div>
        </div>
       <Footer/>
      </div>
    
  );
};

export default Accueil;
