import React, { useState, useEffect } from 'react';
import './Avis.css'; 
import { FaStar } from 'react-icons/fa';
import Header from '../HeaderClient/HeaderClient';
import Footer from '../FooterClient/FooterClient';
function Avis() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await fetch('/api/comments'); 
      const data = await response.json();
      setComments(data.comments);
    } catch (error) {
      console.error('Erreur lors de la récupération des commentaires:', error);
    }
  };

  const handleInputChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleRatingChange = (ratingValue) => {
    setRating(ratingValue);
  };

  const handleHoverRatingChange = (ratingValue) => {
    setHoverRating(ratingValue);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (newComment.trim() !== '' && rating > 0) {
      try {
        const response = await fetch('/api/comments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ text: newComment, rating: rating })
        });
        if (response.ok) {
          fetchComments();
          setNewComment('');
          setRating(0);
        } else {
          console.error('Erreur lors de l\'ajout du commentaire:', response.statusText);
        }
      } catch (error) {
        console.error('Erreur lors de l\'ajout du commentaire:', error);
      }
    } else {
      alert('Veuillez saisir un commentaire et une note.');
    }
  };

  return (
    <div className='avis'>
          <Header/>
    <div className="avis-container">
      
      <h2>Commentaires</h2>
      <ul className="comment-list">
        {comments.map(comment => (
          <li key={comment.id} className="comment-item">
            <div className="comment-rating">
              {[...Array(5)].map((_, index) => {
                const starRating = index + 1;
                return (
                  <span
                    key={starRating}
                    className="star"
                    onClick={() => handleRatingChange(starRating)}
                    onMouseEnter={() => handleHoverRatingChange(starRating)}
                    onMouseLeave={() => handleHoverRatingChange(0)}
                  >
                    <FaStar
                      color={starRating <= (hoverRating || rating) ? "#ffc107" : "#e4e5e9"}
                      size={24}
                      style={{ marginRight: "5px", cursor: "pointer" }}
                    />
                  </span>
                );
              })}
            </div>
            {comment.text}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className="comment-form">
        <textarea
          value={newComment}
          onChange={handleInputChange}
          placeholder="Ajouter un commentaire"
          rows="4"
          cols="50"
          className="comment-input"
        ></textarea>
        <br />
        <button type="submit" className="submit-btn">Ajouter un commentaire</button>
      </form>
      
    </div>
    <Footer/>
    </div>
  );
}

export default Avis;
