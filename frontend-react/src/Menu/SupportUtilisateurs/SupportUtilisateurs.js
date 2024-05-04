import React from 'react';
import Header from '../../Header/Header';
import './SupportUtilisateurs.css';

function SupportUtilisateurs() {
  return (
    <div>
      <Header/>
      <br/>
    <strong>Bienvenue sur "Business To Client"    !</strong>
    <br/><br/><br/>
    <p className='intro'>
      Nous sommes extrêmement enthousiastes de vous présenter notre plateforme innovante,spécialement conçue pour simplifier et optimiser votre expérience<br/> 
      dans la rechercheet la gestion d'ouvriers qualifiés, couvrant une vaste gamme de domaines allant de la construction,à la rénovation, en passant par la plomberie,<br/>
       l'électricité, et bien d'autres encore. Avec notre solution, vous pourrez accéder à un réseau étendu de professionnels compétents, prêts à répondre <br/>
       à vos besoins les plus divers, que ce soit pour des projets résidentiels, commerciaux, ou industriels.</p>
    <table>
      
      <tbody>
        <tr>
          <td>
          <legend>Cher Client !</legend>
            <p>
            Bienvenue sur notre plateforme de gestion des ouvriers ! Nous sommes ravis de vous accueillir dans notre communauté 
            dédiée à simplifier la gestion des travailleurs. Chez nous, vous trouverez un espace convivial et intuitif conçu pour
             répondre à vos besoins en matière de gestion de personnel. Que vous soyez une petite entreprise désireuse de
              rationaliser ses opérations ou une grande société cherchant à optimiser la productivité de ses équipes,
               notre plateforme offre une gamme complète d'outils efficaces pour faciliter la gestion de vos équipes, 
               l'organisation des plannings, le suivi des performances et bien plus encore. Explorez nos fonctionnalités 
               dès maintenant et découvrez comment notre plateforme peut révolutionner votre gestion des ouvriers pour le mieux.
            </p>
          </td>
          <td>
            <img src="/client.png" alt="client" className="client-img" />
          </td>
        </tr>
        <tr>
          <td>
            <img src="/ouv.png" alt="Ouvrier" className="ouvrier-img" />
          </td>
          <td>
          <legend>Cher Ouvrier !</legend>
            <p>
            Vous êtes un ouvrier à la recherche d'opportunités passionnantes ? Rejoignez notre communauté dès aujourd'hui
             et explorez un large éventail d'offres d'emploi dans divers secteurs. Que vous soyez un professionnel chevronné
              à la recherche de nouveaux défis ou un débutant désireux de faire ses preuves, notre plateforme conviviale vous
               offre l'opportunité idéale de mettre en valeur vos compétences et votre expérience en postulant directement.
                Ne laissez pas passer ces opportunités excitantes qui vous attendent. Rejoignez-nous dès maintenant pour découvrir le poste parfaitement adapté à vos compétences et à vos aspirations professionnelles.
            </p>
          </td>
        </tr>
      </tbody>
    </table>
    <strong className='équipe'>L'équipe de "Business To Client"</strong>
    <div className="phrases-container">
          <div className="phrase-card">
            <img src="target.png" alt="Target" />
            <p >Précisez votre urgence en une minute</p>
          </div>
          <div className="phrase-card">
            <img src="link.png" alt="Link" />
            <p>Besoin de professionnels disponibles immédiatement</p>
          </div>
          <div className="phrase-card">
            <img src="people.png" alt="People" />
            <p>Nous recommandons les meilleurs professionnels pour vous</p>
          </div>
          <div className="phrase-card">
            <img src="bussiness.png" alt="Business" />
            <p>Une validation simple, en un clic</p>
          </div>
        </div>
    </div>
  );
}

export default SupportUtilisateurs;
