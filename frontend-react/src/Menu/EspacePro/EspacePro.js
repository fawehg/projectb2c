import React, { useState } from 'react';
import './EspacePro.css';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';

function EspacePro() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateEmail(email)) {
      setEmailError('Veuillez saisir une adresse e-mail valide.');
      setPassword(''); // Clear password field on email validation error
      return;
    }
   
    setEmailError('');
    console.log('Login submitted for:', email, password);
   
    setEmail('');
    setPassword('');
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
          <p className="forgot-password">
            <a href="/forgot-password">Mot de passe oublié</a>
          </p>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default EspacePro;
