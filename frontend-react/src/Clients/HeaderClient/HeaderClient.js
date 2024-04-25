import React from 'react';
import './HeaderClient.css';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';


const Header = () => {


 const navigate = useNavigate();
 const handleLogout = async () => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_API_URL}/client/logout`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming you are using a Bearer token
        },
      }
    );

    console.log("Request Headers:", JSON.stringify(response.headers));

    if (response.status === 200) {
      console.log("logout successful");
      localStorage.removeItem('token');
    } else {
      console.log("Logout failed");
    }
  } catch (error) {
    console.log("An error occurred while trying to logout", error);
  }
};


  return (
    <div className="header"> 
      <div className="logo-container">
        <img src="./LOGO.png" alt="Logo" className="logo" />
      </div>
      <div className="buttons">
        <button onClick={handleLogout}>Déconnexion</button>
        
        
      </div>
      <div className="header-text">
        <p>Bienvenue cher Client</p>
        
      </div>
      
      <div>
        <svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
          <defs>
            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
          </defs>
          <g className="parallax">
            <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7)" />
            <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
            <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
            <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default Header;
