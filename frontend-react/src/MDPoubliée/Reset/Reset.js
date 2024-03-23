import React, { useState } from 'react';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import './Reset.css';
import axios from 'axios';

function ResetMotDePasse() {
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== passwordConfirmation) {
            setError('Les mots de passe ne correspondent pas.');
            return;
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/ouvrier/verify-reset-code`,
                {
                    email,
                    token,
                    password,
                    passwordConfirmation
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );

            console.log(response.data);

        } catch (error) {
            console.error('Erreur lors de la requête', error);
            setError('Une erreur est survenue lors de la réinitialisation du mot de passe.');
        }
    };

    return (
        <div>
            <Header />
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
                <button type="submit" className='confirmer'>Confirmer</button>
            </form>
            
            <Footer />
        </div>
    );
}

export default ResetMotDePasse;
