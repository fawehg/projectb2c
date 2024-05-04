import React, { useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './MDPoubliée.css';
import axios from 'axios';

function ResetMotDePasse() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/ouvrier/reset-password`, 
                {
                    email: email 
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log(response.data);

            if (response.data && response.data.error === "Email non trouvé") {
                setMessage("L'e-mail n'existe pas.");
            } else {
                setMessage("Vérifiez votre e-mail pour les instructions de réinitialisation.");
            }
        } catch (error) {
            console.error('Erreur lors de la requête :', error);
        }
    };

    return (
        
                <div className='MDPoubliee' style={{backgroundImage: `url('/reset.jpg')`}}>

            <Header/> 
            <form onSubmit={handleSubmit} className='md'>
                <h2>Réinitialiser le mot de passe</h2>
                <input
                    placeholder="Email"
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                /><br />
                <br />
                <button type="submit" className='confirmer'>Confirmer</button>
            </form>
            {message && <p>{message}</p>}
            <Footer/>
        </div>
    );
}

export default ResetMotDePasse;
