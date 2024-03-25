import React, { useState, useEffect } from 'react';
import './ProfilOuvrier.css'; 
import Header from '../HeaderOuvrier/HeaderOuvrier';
import Footer from '../FooterOuvrier/FooterOuvrier';
import axios from 'axios'; 

function ProfilOuvrier() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.post(`${process.env.REACT_APP_API_URL}/ouvrier/show`);
                setUser(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération de l'utilisateur:", error);
            }
        };
  
        fetchUser();
    }, []);
  
    const handleModifierProfil = () => {
        console.log("Modifier profil");
    };
  

    return (
        <div>
            <Header/>
            <div className="profil-container">
                <div className="main">
                    <div className="profil">
                        <h1>Profil</h1>
                        {user ? (
                            <div>
                                <div className="profile-img">
                                    <img src={user.image} alt={`${user.nom} ${user.prenom}`} />
                                </div>
                                <div className="profile-info">
                                    <h2>{user.nom} {user.prenom}</h2>
                                    <p>Email: {user.email}</p>
                                    <p>Ville: {user.ville}</p>
                                    <p>Adresse: {user.adresse}</p>
                                    <p>Profession: {user.profession}</p>
                                    <p>Spécialités: {user.specialties ? user.specialties.join(', ') : 'Non spécifié'}</p>
                                    <p>Jours de disponibilité: {user.joursDisponibilite ? user.joursDisponibilite.join(', ') : 'Non spécifié'}</p>
                                    <p>Heure de début: {user.heureDebut}</p>
                                    <p>Heure de fin: {user.heureFin}</p>
                                </div>
                            </div>
                        ) : (
                            <p>Chargement des informations personnelles...</p>
                        )}
                        <button className='button' onClick={handleModifierProfil}>Modifier profil</button>
                    </div>

                    <div className="history">
                        <h2>Historique</h2>
                        <div>
                            {/* Contenu de l'historique */}
                            <p>Historique des activités...</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default ProfilOuvrier;
