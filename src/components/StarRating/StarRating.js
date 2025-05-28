import { useState, useEffect } from "react";
import styles from "./StarRating.module.css";

const StarRating = ({ initialRating = 0, onRatingChange }) => {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);

  // Atualiza o rating quando o initialRating mudar
  useEffect(() => {
    setRating(initialRating);
  }, [initialRating]);

  const handleRating = (value) => {
    setRating(value);
    if (onRatingChange) {
      onRatingChange(value);
    }
  };

  return (
    <div className={styles.star_rating}>
      {[...Array(5)].map((_, index) => {
        const value = index + 1;
        return (
          <button
            type="button"
            key={value}
            className={`${styles.star} ${
              value <= (hover || rating) ? styles.active : ""
            }`}
            onClick={() => handleRating(value)}
            onMouseEnter={() => setHover(value)}
            onMouseLeave={() => setHover(0)}
            aria-label={`${value} stars`}
          >
            <span>★</span>
          </button>
        );
      })}
      {rating > 0 && (
        <span className={styles.rating_text}>{rating} de 5 estrelas</span>
      )}
    </div>
  );
};

export default StarRating;
