import React, { useState } from 'react';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import './Reset.css';

function ResetMotDePasse() {
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [token, setToken] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('/api/password/reset', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, token, password, password_confirmation: passwordConfirmation }),
            });

            const data = await response.json();
            setMessage(data.message);
        } catch (error) {
            console.error('Erreur lors de l\'envoi de la demande :', error);
        }
    };

    return (
        <div>
            <Header/>
            
            <form onSubmit={handleSubmit} className='reset'>
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
                <input
                placeholder="Code de réinitialisation"
                    type="text"
                    id="token"
                    name="token"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    required
                /><br />
                
               
                <input
                placeholder="Nouveau mot de passe"
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                /><br />
                <input
                placeholder="Confirmez le nouveau mot de passe"
                    type="password"
                    id="passwordConfirmation"
                    name="passwordConfirmation"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    required
                /><br />
                <button type="submit" className='confirmer'>comnfirmer</button>
            </form>
            {message && <p>{message}</p>}
            <Footer/>
        </div>
    );
}

export default ResetMotDePasse;