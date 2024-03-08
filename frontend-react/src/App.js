import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Accueil from './Menu/Accueil/Accueil';
import EspacePro from './Menu/EspacePro/EspacePro';
import Client from './Clients/Client';
import Ouvrier from './Ouvrier/Ouvrier';
import RechercheOuvrier from './Clients/RechercheOuvrier/RechercheOuvrier';
import ProfilOuvrier from './Ouvrier/ProfilOuvrier/ProfilOuvrier';
import MotDePasseOublie from './MDPoubliée/MDPoubliée';
import Reset from './MDPoubliée/Reset/Reset';



function App() {
  return (
    <Router>
      <div className="app-container">
        
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/espacePro" element={<EspacePro />} />
          <Route path="/client" element={<Client/>} />
          <Route path="/ouvrier" element={<Ouvrier/>} />
          <Route path="/recherche-ouvrier" element={<RechercheOuvrier/>} />
          <Route path="/profil-ouvrier" element={<ProfilOuvrier/>} />
          <Route path="/mot-de-passe-oublie" element={<MotDePasseOublie/>} />
          <Route path="/reset" element={<Reset/>} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;