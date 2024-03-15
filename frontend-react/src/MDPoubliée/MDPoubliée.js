import React, { useState } from 'react';

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
            <h2>Réinitialiser le mot de passe</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="token">Code de réinitialisation :</label><br />
                <input
                    type="text"
                    id="token"
                    name="token"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    required
                /><br />
                <label htmlFor="email">Adresse e-mail :</label><br />
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                /><br />
                <label htmlFor="password">Nouveau mot de passe :</label><br />
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                /><br />
                <label htmlFor="passwordConfirmation">Confirmez le nouveau mot de passe :</label><br />
                <input
                    type="password"
                    id="passwordConfirmation"
                    name="passwordConfirmation"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    required
                /><br />
                <button type="submit">Envoyer</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default ResetMotDePasse;