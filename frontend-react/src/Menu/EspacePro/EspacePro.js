import React, { useState } from 'react';
import './EspacePro.css';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';

function EspacePro() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateEmail(email)) {
      setEmailError('Veuillez saisir une adresse e-mail valide.');
      setPassword('');
      return;
    }

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      console.log(response.data);
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('Une erreur est survenue lors de la connexion. Veuillez réessayer.');
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (emailError) setEmailError('');
  };

  
  return (
    <div className="login-containere">
      <Header />
      <div className="Espace">
        <form onSubmit={handleSubmit} className="loginform">
          <h2>Espace Pro</h2>
          <div className="formgroup">
            <input
              type="email"
              id="email"
              placeholder='Email'
              value={email}
              onChange={handleEmailChange}
              required
            />
            {emailError && <div className="error-message">{emailError}</div>}
          </div>
          <div className="formgroup">
            
            <input
              type="password"
              id="password"
              placeholder='Mot de passe'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Connexion</button>

        </form>
      </div>
      <Footer />
    </div>
  );
}

export default EspacePro;
