import React, { useState, useEffect } from 'react';
import './ProfilOuvrier.css'; 
import Header from '../HeaderOuvrier/HeaderOuvrier';
import Footer from '../FooterOuvrier/FooterOuvrier';
import axios from 'axios'; 

function ProfilOuvrier() {
    const [informationsPersonnelles, setInformationsPersonnelles] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                console.log(token);
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/ouvrier/profil`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }); 
                setInformationsPersonnelles(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des données : ', error);
            }
        };
        fetchData();
    }, []);

    const handleModifierProfil = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/ouvrier/profil`, null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }); 
            console.log("Profil modifié avec succès !");
        } catch (error) {
            console.error('Erreur lors de la modification du profil : ', error);
        }
    };

    return (
        <div>
            <Header/>
            <div className="profil-container">
                <div className="main">
                    <div className="profil">
                        <div className="profil-header">
                            {informationsPersonnelles && informationsPersonnelles.photo ? (
                                <img src={informationsPersonnelles.photo} alt="Photo de profil" className="profil-photo" />
                            ) : (
                                <div className="profil-photo placeholder"></div>
                            )}
                        </div>
                        
                        {informationsPersonnelles ? (
                            <div className="profil-info">
                                <ul>
                                    <li>Nom: {informationsPersonnelles.nom}</li>
                                    <li>Email: {informationsPersonnelles.email}</li>
                                    <li>Adresse: {informationsPersonnelles.adresse}</li>
                                    <li>Profession: {informationsPersonnelles.profession}</li>
                                    <li>Spécialités: {informationsPersonnelles.specialties ? informationsPersonnelles.specialties.join(', ') : 'N/A'}</li>
                                    <li>Numéro de téléphone: {informationsPersonnelles.telephone}</li>
                                </ul>
                            </div>
                        ) : (
                            <p>Chargement des informations personnelles...</p>
                        )}
                        
                        <button className='modifier' onClick={handleModifierProfil}>Modifier profil</button>
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
