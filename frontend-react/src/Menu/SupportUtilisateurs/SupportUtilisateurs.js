import React, { useState } from 'react';
import './SupportUtilisateurs.css';

const SupportUtilisateurs= () => {
  const [flipped, setFlipped] = useState(false);

  const toggleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <div className="book">
      <Page
        title="The Pilgrim's Path"
        content="The pilgrim must visit each of the Shrines of the Seven Graces. At each site the pilgrim must stand before the three-sided stone triolith and read the inscription. To ease the pilgrim's task, the Temple has made this list of shrines along with directions and advice to pilgrims. The blessings of each shrine last at least a half day."
        flipped={flipped}
        toggleFlip={toggleFlip}
      />
      <Page
        title="The Fields of Kummu: Shrine of Humility"
        content="Here Lord Vivec met a poor farmer whose guar had died. The farmer could not harvest his muck without his guar, and he could not provide for his family or his village. So the Lord Vivec removed his fine clothes and toiled in the fields like a beast of burden until the crop was harvested. It is at the Fields of Kummu we go to pray for the same humility Lord Vivec showed on that day. The Fields of Kummu are west of Suran on the north shore of Lake Amaya as you head towards Pelagiad. The shrine is between two rocks, and most easily noticed while traveling east along the road. Alof's farm nearby has a small dock on the north bank of Lake Amaya. This is the only dock nearby which Alof kindly allows servants of the Temple to use. It is customary to leave a portion of muck at the shrine to represent Vivec's humility."
        flipped={flipped}
        toggleFlip={toggleFlip}
      />
      {/* Ajoutez d'autres pages ici */}
    </div>
  );
};

const Page = ({ title, content, flipped, toggleFlip }) => {
  return (
    <div className={`page ${flipped ? 'flipped' : ''}`} onClick={toggleFlip}>
      <div className="side-1">
        <div className="content">
          <h2>{title}</h2>
          <p>{content}</p>
        </div>
      </div>
      <div className="side-2">
        <div className="content">
          <h2>{title}</h2>
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
};

export default SupportUtilisateurs;
