import styles from "./Favorites.module.css";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import PostDetail from "../../components/PostDetail";
import { useAuthValue } from "../../context/AuthContext";
import { useFavorites } from "../../hooks/useFavorites";

const Favorites = () => {
  const { user } = useAuthValue();
  const { documents: posts } = useFetchDocuments("posts");
  const { favorites, loading } = useFavorites(user?.uid);

  const favoritePosts =
    posts?.filter((post) => favorites.includes(post.id)) || [];

  return (
    <div className={styles.favorites_container}>
      <h1>Meus Favoritos</h1>
      <div className={styles.favorites_grid}>
        {loading ? (
          <p>Carregando...</p>
        ) : favoritePosts.length === 0 ? (
          <p className={styles.no_favorites}>
            Você ainda não adicionou nenhum post aos favoritos.
          </p>
        ) : (
          favoritePosts.map((post) => <PostDetail key={post.id} post={post} />)
        )}
      </div>
    </div>
  );
};

export default Favorites;
