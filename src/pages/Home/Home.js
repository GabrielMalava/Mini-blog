import styles from "./Home.module.css";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import PostDetail from "../../components/PostDetail";
import Sidebar from "../../components/Sidebar/Sidebar";

const Home = () => {
  const [query, setQuery] = useState("");
  const { documents: posts, loading } = useFetchDocuments("posts");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const navigate = useNavigate();

  // Inicializar posts filtrados
  useEffect(() => {
    if (posts) {
      setFilteredPosts(posts);
    }
  }, [posts]);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (query) {
      return navigate(`/search?q=${query}`);
    }
  };

  const handleFilters = ({ tags, dateRange, author }) => {
    let filtered = [...posts]; // Filtrar por tags
    if (tags && tags.length > 0) {
      filtered = filtered.filter(
        (post) => post.tags && tags.every((tag) => post.tags.includes(tag))
      );
    }

    // Filtrar por autor
    if (author && author !== "all") {
      filtered = filtered.filter((post) => post.createdBy === author);
    }

    // Filtrar por data
    if (dateRange && dateRange !== "all") {
      const now = new Date();
      filtered = filtered.filter((post) => {
        const postDate = post.createdAt?.toDate();
        if (!postDate) return true;

        const diffDays = (now - postDate) / (1000 * 60 * 60 * 24);

        switch (dateRange) {
          case "today":
            return diffDays < 1;
          case "week":
            return diffDays < 7;
          case "month":
            return diffDays < 30;
          case "year":
            return diffDays < 365;
          default:
            return true;
        }
      });
    }

    setFilteredPosts(filtered);
  };

  return (
    <div className={styles.home}>
      <h1>Veja os nossos posts mais recentes</h1>
      <form onSubmit={handleSubmit} className={styles.search_form}>
        <input
          type="text"
          placeholder="Busque por tags..."
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />
        <button className="btn btn-dark">Pesquisar</button>{" "}
      </form>
      <div className={styles.content}>
        <Sidebar posts={posts} onFilterChange={handleFilters} />
        <div className={styles.post_list}>
          {loading && <p>Carregando...</p>}
          {filteredPosts &&
            filteredPosts.map((post) => (
              <PostDetail key={post.id} post={post} />
            ))}
          {filteredPosts && filteredPosts.length === 0 && (
            <div className={styles.noposts}>
              <p>Não foram encontrados posts</p>
              <Link to="/posts/create" className="btn">
                Criar primeiro post
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
