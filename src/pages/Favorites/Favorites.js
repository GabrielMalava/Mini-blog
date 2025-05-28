import styles from "./Favorites.module.css";
import { useState, useEffect } from "react";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import PostDetail from "../../components/PostDetail";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const { documents: posts } = useFetchDocuments("posts");
  useEffect(() => {
    // Recuperar favoritos do localStorage
    const updateFavorites = () => {
      const storedFavorites =
        JSON.parse(localStorage.getItem("favorites")) || [];
      setFavorites(storedFavorites);
    };

    // Carregar favoritos iniciais
    updateFavorites(); // Adicionar listener para mudanças no localStorage
    window.addEventListener("storage", updateFavorites);

    // Listener para mudanças diretas no localStorage na mesma janela
    window.addEventListener("favoritesChanged", updateFavorites);

    // Listener para mudanças no localStorage entre janelas
    const handleStorageChange = (e) => {
      if (e.key === "favorites") {
        updateFavorites();
      }
    };
    window.addEventListener("storage", handleStorageChange); // Cleanup
    return () => {
      window.removeEventListener("favoritesChanged", updateFavorites);
      window.removeEventListener("storage", updateFavorites);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const favoritePosts =
    posts?.filter((post) => favorites.includes(post.id)) || [];

  return (
    <div className={styles.favorites_container}>
      <h1>Meus Favoritos</h1>
      <div className={styles.favorites_grid}>
        {favoritePosts.length === 0 ? (
          <p className={styles.no_favorites}>
            Você ainda não adicionou nenhum post aos favoritos.
          </p>
        ) : (
          favoritePosts.map((post) => (
            <PostDetail
              key={post.id}
              post={post}
              isFavorite={true}
              showFavoriteButton={true}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Favorites;
