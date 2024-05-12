import React from 'react';
import './contact.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faUsers } from '@fortawesome/free-solid-svg-icons';

const Contact = () => {
  return (
    <div className="contact-container">

      <div className="contact-header">
        <br/>
        <h1>CONTACTEZ NOUS</h1>
      </div>
      <div className="contact-content">
        <div className="contact-form">
          <form>
            <div className="form-group">
              <label htmlFor="name">Nom:</label>
              <input type="text" id="name" name="name" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea id="description" name="description"></textarea>
            </div>
            <button type="submit">Envoyer</button>
          </form>
        </div>
        <div >
          <img src='/contact.jpg' alt="Image de contact" className="contact-image"/>
        </div>
      </div>
     
      <div className="contact-options">
        <div className="contact-option">
          <FontAwesomeIcon icon={faPhone} size="2x" color="white" />
          <h2>CONTACTEZ-NOUS PAR TÉLÉPHONE</h2>
          <p>Rapide et efficace, pour toute demande, n'hésitez pas à nous appeler au :</p>
          <span>+33 (0) 2 41 35 98 35</span>
        </div>
        <div className="contact-option">
          <FontAwesomeIcon icon={faEnvelope} size="2x" color="white" />
          <h2>FORMULAIRE DE CONTACT</h2>
          <p>Vous pouvez utiliser le formulaire ci-dessous pour nous envoyer un mail, nous vous recontacterons dans les meilleurs délais.</p>
        </div>
        <div className="contact-option">
          <FontAwesomeIcon icon={faUsers} size="2x" color="white" />
          <h2>L'ÉQUIPE B2C</h2>
          <p>Venez prendre un café ou un thé à l'agence, nous serons ravis de vous accueillir à l'adresse suivante :</p>
          <span>14 rue Savary<br/>49100 ANGERS</span>
        </div>
      </div>
    </div>
  );
}

export default Contact;