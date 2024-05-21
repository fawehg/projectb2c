import React, { useState, useEffect } from 'react';
import './ProfilOuvrier.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faCog } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ProfilOuvrier() {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [ville, setVille] = useState('');
    const [profession, setProfession] = useState('');
    const [telephone, setTelephone] = useState('');
    const [notification, setNotification] = useState('');
    const [photoProfil, setPhotoProfil] = useState('');
    const [loading, setLoading] = useState(true);
    const [id, setId] = useState('');
    const [avis, setAvis] = useState([]);

    const [specialties, setSpecialites] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/ouvrier/showClientAvis`, {
                    params: { id },
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (Array.isArray(response.data.resultData.avis)) {
                    setAvis(response.data.resultData.avis);
                    console.log(avis)
                } 
                setLoading(false);
            } catch (error) {
               
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/ouvrier/profil`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = response.data.ResultData.data;
                setNom(data.nom);
                setPrenom(data.prenom);
                setEmail(data.email);
                setVille(data.ville);
                setProfession(data.profession);
                setSpecialites(data.specialties);
                setPhotoProfil(data.photoProfil);
                setTelephone(data.numeroTelephone);
                setId(data.id);
                setLoading(false);
                console.log(data.id);
            } catch (error) {
                console.error('Erreur lors de la récupération des données : ', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleAvisClick = () => {
        localStorage.setItem('ouvrierId', id);
        console.log('zzzz', id);
    };

    return (
        <div>
            {notification && <div className="notification">{notification}</div>}
            <div className="profil-ouvrier">
                <div className="main">
                    <div className="profil">
                        <img src="/LOGO.png" className="LOGO-PROFIL" alt="Photo de profil" />
                        <ul>
                            <li>
                                <FontAwesomeIcon icon={faUsers} />
                                <Link to="/JOBS"><span>Travail demandé</span></Link>
                            </li>
                                
                            <br />
                            <li>
                                <FontAwesomeIcon icon={faCog} />
                                <Link to="/modifier-profil"><span>Modifier profil</span></Link>
                            </li>
                        </ul>
                        <br /><br /><br /><br />
                        <ul className="profil-info">
                            <img src={photoProfil} className="photo-profil" alt="Photo de profil" />
                            <li data-label="Nom" className="Nom">{nom}</li>
                            <li data-label="Ville" className="ville">{ville}</li>
                            <li data-label="Email" className="Email">{email}</li>
                            <li data-label="Tél" className="Téléphone">{telephone}</li>
                            <li data-label="Profession" className="Profession">{profession}</li>
                            <li data-label="specialties" className="specialties">{specialties}</li>
                        </ul>
                    </div>
                   
                        <div className="avis-container">
        
        
            {avis.map((avisItem) => {
                const { id, client_nom, rate, commentaire ,client_prenom} = avisItem;
                return (
                    <div key={id} className="avis-card">
                        <h2>{client_nom} {client_prenom} <h2 className="rating">
                            {[...Array(rate)].map((_, index) => (
                                <span key={index} className="star">&#9733;</span>
                            ))}
                        </h2></h2>
                        
                        <h3>{commentaire}</h3>
                        </div>
                );
            })}
        </div>
                    </div>
            
            </div>
        </div>
    );
}

export default ProfilOuvrier;
