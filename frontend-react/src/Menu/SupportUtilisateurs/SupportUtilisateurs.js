
import React, { useState } from 'react';
import './SupportUtilisateurs.css';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';


const SupportUtilisateurs = () => {
  const [flippedPages, setFlippedPages] = useState([]);

  const handlePageClick = (index) => {
    setFlippedPages((prevFlippedPages) => {
      if (prevFlippedPages.includes(index)) {
        return prevFlippedPages.filter((page) => page !== index);
      } else {
        return [...prevFlippedPages, index];
      }
    });
  };

  const reorderPages = () => {
    
  };

  return (
    <div >
    <Header/>
    <div className='support'>
    <div className="book">
    <img src="./LOGO.png" alt="Logo" className="logo-book" />
      {[...Array(3)].map((_, index) => (
        <div
          key={`page-${index + 1}`}
          className={`page ${flippedPages.includes(index) ? 'flipped' : ''}`}
          onClick={() => handlePageClick(index)}
        >
          <div className="side-1" id={`p${index * 2 + 1}`}>
            <div className="content">
              {index === 0 && (
                <>
                  <h1>The Pilgrim's Path</h1>
                  <p>
                    The pilgrim must visit each of the Shrines of the Seven Graces...
                  </p>
                </>
              )}
              {index === 1 && (
                <>
                  <h2>The Fields of Kummu: Shrine of Humility</h2>
                  <p>
                    Here Lord Vivec met a poor farmer whose guar had died...
                  </p>
                </>
              )}
              {/* Repeat for other pages */}
            </div>
          </div>
          <div className="side-2" id={`p${index * 2 + 2}`}>
            <div className="content">
              {index === 0 && (
                <>
                  <h2>To Stop the Moon: The Shrine of Daring</h2>
                  <p>
                    When Sheogorath rebelled against the Tribunal...
                  </p>
                </>
              )}
              {index === 1 && (
                <>
                  <h2>The Palace: Shrine of Generosity</h2>
                  <p>
                    Long after Lord Nerevar and the Tribunal triumphed over Dagoth Ur...
                  </p>
                </>
              )}
              {/* Repeat for other pages */}
            </div>
          </div>
        </div>
      ))}
    </div>
    </div>
    <Footer/>
    </div>
  );
  

};


export default SupportUtilisateurs;
