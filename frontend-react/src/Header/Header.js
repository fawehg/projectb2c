import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom'; 



const Header = () => {
  return (
    <div className="header"> 
      <div className="logo-container">
      <Link to="/"> <img src="./LOGO.png" alt="Logo" className="logo" /></Link>
      </div>
      <div className="buttons">
        <Link to="/"><button>Accueil</button></Link>
        <Link to="/espacepro"><button>Espace Pro</button></Link>
        <Link to="/support-utilisateurs"><button>Support Utilisateur</button></Link>
        <Link to="/contact"><button>Contactez Nous </button></Link>
      </div>
      <div className="header-text">
      
        <p className="additional-text">Ouvriers compétents&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="rapide">Gestion simplifiée</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Projets réussis</p>
      </div>
      
      <div>
        <svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
          <defs>
            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
          </defs>
          <g className="parallax">
            <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7)" />
            <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
            <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
            <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default Header;
