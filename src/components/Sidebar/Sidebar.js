import { useState, useEffect } from "react";
import styles from "./Sidebar.module.css";

const Sidebar = ({ posts, onFilterChange }) => {
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [dateRange, setDateRange] = useState("all");
  const [authorFilter, setAuthorFilter] = useState("all");
  const [authors, setAuthors] = useState([]);

  // Extrair tags únicas e autores das postagens
  useEffect(() => {
    if (posts) {
      // Extrair todas as tags únicas
      const allTags = [...new Set(posts.flatMap((post) => post.tags || []))];
      setTags(allTags.filter(Boolean)); // Remove undefined/null values

      // Extrair todos os autores únicos
      const allAuthors = [...new Set(posts.map((post) => post.createdBy))];
      setAuthors(allAuthors);
    }
  }, [posts]);

  const handleTagToggle = (tag) => {
    setSelectedTags((prev) => {
      const newTags = prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag];

      // Notificar mudanças nos filtros
      onFilterChange({
        tags: newTags,
        dateRange,
        author: authorFilter,
      });

      return newTags;
    });
  };

  const handleDateRangeChange = (range) => {
    setDateRange(range);
    onFilterChange({
      tags: selectedTags,
      dateRange: range,
      author: authorFilter,
    });
  };

  const handleAuthorChange = (author) => {
    setAuthorFilter(author);
    onFilterChange({
      tags: selectedTags,
      dateRange,
      author,
    });
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.filterSection}>
        <h3>Filtrar por Tags</h3>
        <div className={styles.tagList}>
          {tags.map((tag) => (
            <label key={tag} className={styles.tagItem}>
              <input
                type="checkbox"
                checked={selectedTags.includes(tag)}
                onChange={() => handleTagToggle(tag)}
              />
              <span className={styles.tagName}>#{tag}</span>
            </label>
          ))}
        </div>
      </div>

      <div className={styles.filterSection}>
        <h3>Filtrar por Data</h3>
        <select
          value={dateRange}
          onChange={(e) => handleDateRangeChange(e.target.value)}
          className={styles.select}
        >
          <option value="all">Todas as datas</option>
          <option value="today">Hoje</option>
          <option value="week">Última semana</option>
          <option value="month">Último mês</option>
          <option value="year">Último ano</option>
        </select>
      </div>

      <div className={styles.filterSection}>
        <h3>Filtrar por Autor</h3>
        <select
          value={authorFilter}
          onChange={(e) => handleAuthorChange(e.target.value)}
          className={styles.select}
        >
          <option value="all">Todos os autores</option>
          {authors.map((author) => (
            <option key={author} value={author}>
              {author}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Sidebar;
