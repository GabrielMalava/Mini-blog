import styles from "./PostDetail.module.css";
import { Link } from "react-router-dom";
import FavoriteButton from "./FavoriteButton/FavoriteButton";
import { useState, useEffect } from "react";
import { useAuthValue } from "../context/AuthContext";

const PostDetail = ({ post, showFavoriteButton = true }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { user } = useAuthValue();

  useEffect(() => {
    if (user) {
      const userFavorites =
        JSON.parse(localStorage.getItem(`favorites_${user.uid}`)) || [];
      setIsFavorite(userFavorites.includes(post.id));
    }
  }, [user, post.id]);

  const handleFavoriteToggle = (postId, favState) => {
    if (!user) return;

    const userFavorites =
      JSON.parse(localStorage.getItem(`favorites_${user.uid}`)) || [];
    let newFavorites = favState
      ? [...userFavorites, postId]
      : userFavorites.filter((id) => id !== postId);

    localStorage.setItem(`favorites_${user.uid}`, JSON.stringify(newFavorites));
    setIsFavorite(favState);

    window.dispatchEvent(new Event("favoritesChanged"));
  };

  return (
    <div className={styles.post_detail}>
      {" "}
      <div className={styles.image_container}>
        <img src={post.image} alt={post.title} />
        {user && (
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
