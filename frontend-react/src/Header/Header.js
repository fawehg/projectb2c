import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom'; 


const Header = () => {
  return (
    <div className="header"> 
      <div className="logo-container">
        <img src="./LOGO.png" alt="Logo" className="logo" />
      </div>
      <div className="buttons">
        <Link to="/"><button>Accueil</button></Link>
        <Link to="/espacepro"><button>Espace Pro</button></Link>
        <Link to="/qui-sommes-nous"><button>Support Utilisateur</button></Link>
      </div>
      <div className="header-text">
        <p>TROUVEZ EN URGENCE UN PROFESSIONNEL DISPONIBLE INTERVENTION EXPRESS 24H/24 7J/7</p>
        <p className="additional-text">SIMPLE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="rapide">RAPIDE</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EFFICACE</p>
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
