import React, { useState, useEffect } from 'react';
import './ProfilOuvrier.css';
import Header from '../HeaderOuvrier/HeaderOuvrier';
import Footer from '../FooterOuvrier/FooterOuvrier';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ProfilOuvrier() {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [ville, setVille] = useState('');
    const [adresse, setAdresse] = useState('');
    const [profession, setProfession] = useState('');
    const [telephone, setTelephone] = useState('');
    const [notification, setNotification] = useState('');
    const [photoProfil, setPhotoProfil] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/ouvrier/profil`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
        
                setNom(response.data.ResultData.data.nom);
                setPrenom(response.data.ResultData.data.prenom);
                setEmail(response.data.ResultData.data.email);
                setVille(response.data.ResultData.data.ville);
                setProfession(response.data.ResultData.data.profession);
                setPhotoProfil(response.data.ResultData.data.photoProfil);
                setTelephone(response.data.ResultData.data.numeroTelephone);  
                setPhotoProfil(response.data.ResultData.data.image); 
                setLoading(false);

            } catch (error) {
                console.error('Erreur lors de la récupération des données : ', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);



    return (
        <div>
            <Header />
            {notification && <div className="notification">{notification}</div>}
            <div className="profil-ouvrier">
                <div className="main">
                    <div className="profil">
                        {loading ? (
                            <p>Chargement des informations personnelles...</p>
                        ) : (
                            <div className="profil-info">
                            <img src={photoProfil} className="photo-profil" />
                            
                            <ul>
                                <li data-label="Nom" className="Nom">{nom}</li>
                                <li data-label="Email" className="Email">{email}</li>
                                <li data-label="Adresse" className="Adresse">{adresse}</li>
                                <li data-label="Profession" className="Profession">{profession}</li>
                                <li data-label="Téléphone" className="Téléphone">{telephone}</li>
                            </ul>
                            
                        </div>
                        
                        )}
                        <br/><br/>
                       <Link to="/modifier-profil"><button className='modifier'>Modifier profil</button></Link>
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
            <Footer />
        </div>
    );
}

export default ProfilOuvrier;
