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
          <Route path="/EspacePro" element={<EspacePro />} />
          <Route path="/Client" element={<Client/>} />
          <Route path="/Ouvrier" element={<Ouvrier/>} />
          <Route path="/RechercheOuvrier" element={<RechercheOuvrier/>} />
          <Route path="/ProfilOuvrier" element={<ProfilOuvrier/>} />
          <Route path="/MotDePasseOublie" element={<MotDePasseOublie/>} />
          <Route path="/Reset" element={<Reset/>} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;