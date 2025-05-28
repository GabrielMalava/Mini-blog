import { useAuthValue } from "../../context/AuthContext";
import { useFavorites } from "../../hooks/useFavorites";
import styles from "./FavoriteButton.module.css";

const FavoriteButton = ({ postId }) => {
  const { user } = useAuthValue();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites(user?.uid);

  const handleToggle = async () => {
    if (!user) return;

    if (isFavorite(postId)) {
      await removeFavorite(postId);
    } else {
      await addFavorite(postId);
    }
  };

  if (!user) return null;

  return (
    <button
      className={`${styles.favorite_btn} ${isFavorite(postId) ? styles.active : ""}`}
      onClick={handleToggle}
      aria-label={
        isFavorite(postId) ? "Remove dos favoritos" : "Adicionar aos favoritos"
      }
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </button>
  );
};

export default FavoriteButton;
