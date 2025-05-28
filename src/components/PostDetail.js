import styles from "./PostDetail.module.css";
import { Link } from "react-router-dom";
import StarRating from "./StarRating/StarRating";
import FavoriteButton from "./FavoriteButton/FavoriteButton";
import { useState, useEffect } from "react";

const PostDetail = ({ post, showFavoriteButton = true }) => {
  const [rating, setRating] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    // Recuperar rating do localStorage
    const savedRating = localStorage.getItem(`rating_${post.id}`);
    if (savedRating) {
      setRating(parseInt(savedRating));
    }

    // Recuperar estado de favorito e configurar um listener para mudanças
    const updateFavoriteState = () => {
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      setIsFavorite(favorites.includes(post.id));
    };

    // Inicializar o estado
    updateFavoriteState();

    // Ouvir mudanças no localStorage
    window.addEventListener("storage", updateFavoriteState);

    // Cleanup
    return () => {
      window.removeEventListener("storage", updateFavoriteState);
    };
  }, [post.id]);

  const handleRatingChange = (value) => {
    setRating(value);
    localStorage.setItem(`rating_${post.id}`, value.toString());
  };
  const handleFavoriteToggle = (postId, favState) => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    let newFavorites = favState
      ? [...favorites, postId]
      : favorites.filter((id) => id !== postId);

    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    setIsFavorite(favState);

    // Disparar evento customizado para notificar mudanças
    window.dispatchEvent(new Event("favoritesChanged"));
  };

  return (
    <div className={styles.post_detail}>
      <div className={styles.image_container}>
        <img src={post.image} alt={post.title} />
        {showFavoriteButton && (
          <FavoriteButton
            initialState={isFavorite}
            onToggle={(favState) => handleFavoriteToggle(post.id, favState)}
            postId={post.id}
          />
        )}
      </div>
      <div className={styles.content}>
        <h2>{post.title}</h2>
        <p className={styles.createdBy}>por {post.createdBy}</p>
        <StarRating
          initialRating={rating}
          onRatingChange={handleRatingChange}
        />
        <div className={styles.tags}>
          {post.tags &&
            post.tags.map((tag) => (
              <p key={tag}>
                <span>#</span>
                {tag}
              </p>
            ))}
        </div>
        {post.body && (
          <p className={styles.excerpt}>{post.body.substring(0, 150)}...</p>
        )}
        <Link to={`/posts/${post.id}`} className="btn btn-outline">
          Ler mais
        </Link>
      </div>
    </div>
  );
};

export default PostDetail;
