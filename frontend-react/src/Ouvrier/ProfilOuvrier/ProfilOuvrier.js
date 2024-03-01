import React, { useState, useEffect } from 'react';
import './ProfilOuvrier.css'; 
import Header from '../HeaderOuvrier/HeaderOuvrier';
import Footer from '../FooterOuvrier/FooterOuvrier';
import axios from 'axios'; // Importez Axios pour effectuer des requêtes HTTP

function ProfilOuvrier() {
    const [informationsPersonnelles, setInformationsPersonnelles] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
<<<<<<< Updated upstream
                const response = await axios.get('http://localhost:8000/api/show'); 
                setInformationsPersonnelles(response.data);
=======
                // Ici vous récupérez les données depuis la base de données
                // Exemple avec une API fictive
                const response = await fetch('http://localhost:8000/api/register');
                const data = await response.json();
                setInformationsPersonnelles(data);
>>>>>>> Stashed changes
            } catch (error) {
                console.error('Erreur lors de la récupération des données : ', error);
            }
        };

        fetchData();
    }, []);

    const handleModifierProfil = async () => {

        try {
            await axios.put('http://localhost:8000/api/update',);
            console.log("Profil modifié avec succès !");
        } catch (error) {
            console.error('Erreur lors de la modification du profil : ', error);
        }
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
                                <ul>
                                    <li>Nom: {informationsPersonnelles.nom}</li>
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
