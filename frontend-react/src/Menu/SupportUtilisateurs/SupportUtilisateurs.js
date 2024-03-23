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

  const pagesContent = [
    {
      title: "The Pilgrim's Path",
      side1: {
        subtitle: "To Stop the Moon: The Shrine of Daring",
        text: "When Sheogorath rebelled against the Tribunal..."
      },
      side2: {
        subtitle: "Additional subtitle",
        text: "Additional text"
      }
    },
    {
      title: "The Fields of Kummu: Shrine of Humility",
      side1: {
        subtitle: "Placeholder subtitle",
        text: "Placeholder text"
      },
      side2: {
        subtitle: "Additional subtitle",
        text: "Additional text"
      }
    }
  ];

  return (
    <div>
      <Header />
      <div className='support'>
        <div className="book">
          {pagesContent.map((page, index) => (
            <div
              key={`page-${index + 1}`}
              className={`page ${flippedPages.includes(index) ? 'flipped' : ''}`}
              onClick={() => handlePageClick(index)}
            >
              <div className="side-1" id={`p${index * 2 + 1}`}>
                <div className="content">
                  <h1>{page.title}</h1>
                  <h2>{page.side1.subtitle}</h2>
                  <p>{page.side1.text}</p>
                </div>
              </div>
              <div className="side-2" id={`p${index * 2 + 2}`}>
                <div className="content">
                  <h2>{page.side2.subtitle}</h2>
                  <p>{page.side2.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SupportUtilisateurs;
