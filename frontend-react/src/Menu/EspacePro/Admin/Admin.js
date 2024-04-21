import React from 'react';
import './Admin.css'; // Assurez-vous d'importer votre fichier CSS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUsers, faSchool, faMoneyBillAlt } from '@fortawesome/free-solid-svg-icons';
import { faTachometerAlt, faBell, faCog } from '@fortawesome/free-solid-svg-icons';

const Admin = () => {
    return (
        <div className="admin-dashboard">
            <div className="side-menu">
                <div className="brand-name">
                    <h1>Brand</h1>
                </div>
                <ul>
                    <li><FontAwesomeIcon icon={faTachometerAlt} /> <span>Dashboard</span> </li>
                    <li><FontAwesomeIcon icon={faUsers} /> <span>Clients</span> </li>
                    <li><FontAwesomeIcon icon={faUsers} /> <span>Ouvriers</span> </li>
                    <li><FontAwesomeIcon icon={faBell} /> <span>Notifications</span> </li>
                    <li><FontAwesomeIcon icon={faCog} /> <span>Paramétres</span> </li>
                </ul>
            </div>
            <div className="container">
                <div className="header">
                  
                </div>
                <div className="content">
                    <div className="cards">
                        <div className="card">
                            <div className="box">
                                <h1>20</h1>
                                <h3>Ouvriers</h3>
                            </div>
                            <div className="icon-case">
                                <FontAwesomeIcon icon={faUser} />
                            </div>
                        </div>
                        <div className="card">
                            <div className="box">
                                <h1>53</h1>
                                <h3>Client</h3>
                            </div>
                            <div className="icon-case">
                                <FontAwesomeIcon icon={faUsers} />
                            </div>
                        </div>
                    
                        <div className="card">
                            <div className="box">
                                <h1>4</h1>
                                <h3>Communication</h3>
                            </div>
                            <div className="icon-case">
                                <FontAwesomeIcon icon={faMoneyBillAlt} />
                            </div>
                        </div>
                    </div>
                    <div className="content-2">
                       
                        <div className="new-students">
                            {/* Contenu de vos nouveaux étudiants */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;