import React, { useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './MDPoubliée.css';

function MotDePasseOublie() {
    const [email, setEmail] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Ici, vous pouvez ajouter la logique pour envoyer l'e-mail de réinitialisation
        console.log('Adresse e-mail soumise :', email);
    };

    const handleChange = (event) => {
        setEmail(event.target.value);
    };

    return (
        <div >
            <Header/>
            
            <form onSubmit={handleSubmit} className='MDpoublie'>
                <label htmlFor="email">Entrez votre adresse e-mail pour réinitialiser votre mot de passe.</label><br />
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder='Email'
                    value={email}
                    onChange={handleChange}
                    required
                />
                <input className='button' type="submit" value="Réinitialiser le mot de passe" />
            </form>
            <Footer/>
        </div>
    );
}

export default MotDePasseOublie;
