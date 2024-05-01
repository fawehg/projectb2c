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
import SupportUtilisateurs from './Menu/SupportUtilisateurs/SupportUtilisateurs';
import Admin from './Menu/EspacePro/Admin/Admin';
import ListeOuvrier from './Clients/ListeOuvrier/ListeOuvrier';
import ModifierProfil from './Ouvrier/ProfilOuvrier/ModiferProfil/ModifierProfil';
import Avis from './Clients/Avis/Avis';
import Jobs from'./Ouvrier/ProfilOuvrier/Jobs/Jobs';
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
          <Route path="/support-utilisateurs" element={<SupportUtilisateurs/>} />
          <Route path="/admin" element={<Admin/>} />
          <Route path="/liste-ouvrier" element={<ListeOuvrier/>} />
          <Route path="/modifier-profil" element={<ModifierProfil/>} />
          <Route path="/avis" element={<Avis/>} />
          <Route path="/jobs" element={<Jobs/>} />



        </Routes>
      </div>
    </Router>
  );
}

export default App;