import React, { useState, useEffect } from 'react';
import './ProfilOuvrier.css'; 
import Header from '../HeaderOuvrier/HeaderOuvrier';
import Footer from '../FooterOuvrier/FooterOuvrier';

function ProfilOuvrier() {
    const [informationsPersonnelles, setInformationsPersonnelles] = useState(null);

    // Simulation de la récupération des données depuis la base de données
    useEffect(() => {
        // Code pour récupérer les informations personnelles depuis la base de données
        // Une fois que les données sont récupérées, mettez à jour l'état
        const fetchData = async () => {
            try {
                // Ici vous récupérez les données depuis la base de données
                // Exemple avec une API fictive
                const response = await fetch('URL_DE_VOTRE_API');
                const data = await response.json();
                setInformationsPersonnelles(data);
            } catch (error) {
                console.error('Erreur lors de la récupération des données : ', error);
            }
        };

        fetchData(); // Appel de la fonction pour récupérer les données au chargement du composant
    }, []); // Le tableau vide en second argument assure que ce useEffect ne s'exécutera qu'une seule fois au montage du composant

    const handleModifierProfil = () => {
        // Placeholder function for handling profile modification
        console.log("Profile modification clicked");
    };

    return (
        <div>
            <Header/>
            <div className="profil-container">
                <div className="main-content">
                    <div className="sidebar">
                        <h1>Profil</h1>
                        {informationsPersonnelles ? (
                            <div>
                                <img src={informationsPersonnelles.photo} alt="Photo de profil" />
                                <ul>
                                    <li>Nom: {informationsPersonnelles.nom}</li>
                                    <li>Âge: {informationsPersonnelles.age} ans</li>
                                    <li>Email: {informationsPersonnelles.email}</li>
                                    <li>Adresse: {informationsPersonnelles.adresse}</li>
                                    <li>Profession: {informationsPersonnelles.profession}</li>
                                    <li>Spécialités: {informationsPersonnelles.specialites.join(', ')}</li>
                                    <li>Numéro de téléphone: {informationsPersonnelles.telephone}</li>
                                </ul>
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
