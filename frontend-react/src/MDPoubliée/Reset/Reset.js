import React, { useState } from 'react';

function Reset() {
    const [token, setToken] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Ici, vous pouvez ajouter la logique pour soumettre le jeton et le nouveau mot de passe
        console.log('Jeton soumis :', token);
        console.log('Nouveau mot de passe soumis :', password);
    };

    const handleTokenChange = (event) => {
        setToken(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    return (
        <div>
            <h1>Réinitialiser le mot de passe</h1>
            <p>Entrez le jeton que vous avez reçu par e-mail, ainsi que votre nouveau mot de passe.</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="token">Jeton :</label><br />
                <input
                    type="text"
                    id="token"
                    name="token"
                    value={token}
                    onChange={handleTokenChange}
                    required
                />
                 <label htmlFor="password">Nouveau mot de passe :</label><br />
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                /><br /><br />
                <input type="submit" value="Réinitialiser le mot de passe" />
            </form>
        </div>
    );
}

export default Reset;
