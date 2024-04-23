import React, { useState, useEffect } from 'react';
import './ProfilOuvrier.css';
import Header from '../HeaderOuvrier/HeaderOuvrier';
import Footer from '../FooterOuvrier/FooterOuvrier';
import axios from 'axios';

function ProfilOuvrier() {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [ville, setVille] = useState('');
    const [adresse, setAdresse] = useState('');
    const [profession, setProfession] = useState('');
    const [specialties, setSpecialties] = useState([]);
    const [joursDisponibilite, setJoursDisponibilite] = useState([]);
    const [heureDebut, setHeureDebut] = useState('');
    const [heureFin, setHeureFin] = useState('');
    const [telephone, setTelephone] = useState('');
    const [notification, setNotification] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                console.log("Token:", token); // Vérifiez le token
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/ouvrier/profil`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log("Données récupérées:", response.data);
    
                setNom(response.data.ResultData.nom);
                setPrenom(response.data.ResultData.prenom);
                setEmail(response.data.ResultData.email);
                setAdresse(response.data.ResultData.adresse);
                setProfession(response.data.ResultData.profession);
                setSpecialties(response.data.ResultData.specialties);
                setJoursDisponibilite(response.data.ResultData.joursDisponibilite);
                setHeureDebut(response.data.ResultData.heureDebut);
                setHeureFin(response.data.ResultData.heureFin);
                setTelephone(response.data.ResultData.telephone);   
    
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
            setNotification('Profil modifié avec succès !');
        } catch (error) {
            console.error('Erreur lors de la modification du profil : ', error);
            setNotification('Erreur lors de la modification du profil');
        }
    };

    return (
        <div>
            <Header />
            {notification && <div className="notification">{notification}</div>}
            <div className="profil-container">
                <div className="main">
                    <div className="profil">

                        {nom ? (
                            <div className="profil-info">
                                <ul>
                                    <li>Nom: {nom}</li>
                                    <li>Email: {email}</li>
                                    <li>Adresse: {adresse}</li>
                                    <li>Profession: {profession}</li>
                                    <li>Spécialités: {specialties ? specialties.join(', ') : 'N/A'}</li>
                                    <li>Jours de disponibilité: {joursDisponibilite ? joursDisponibilite.join(', ') : 'N/A'}</li>
                                    <li>Heure de début: {heureDebut}</li>
                                    <li>Heure de fin: {heureFin}</li>
                                    <li>Numéro de téléphone: {telephone}</li>
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
            <Footer />
        </div>
    );
}

export default ProfilOuvrier;
