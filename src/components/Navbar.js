import { NavLink } from "react-router-dom";
import { useAuthentication } from "../hooks/useAuthentication";
import { useAuthValue } from "../context/AuthContext";
import { useState } from "react";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const { user } = useAuthValue();
  const { logout } = useAuthentication();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className={styles.navbar}>
      <NavLink to="/" className={styles.brand}>
        Mini <span>Blog</span>
      </NavLink>
      <button
        className={`${styles.menu_button} ${menuOpen ? styles.active : ""}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <ul className={`${styles.links_list} ${menuOpen ? styles.active : ""}`}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.active : "")}
            onClick={closeMenu}
          >
            Home
          </NavLink>
        </li>
        {user && (
          <li>
            <NavLink
              to="/favorites"
              className={({ isActive }) => (isActive ? styles.active : "")}
              onClick={closeMenu}
            >
              Favoritos
            </NavLink>
          </li>
        )}
        {!user && (
          <>
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? styles.active : "")}
                onClick={closeMenu}
              >
                Entrar
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/register"
                className={({ isActive }) => (isActive ? styles.active : "")}
                onClick={closeMenu}
              >
                Cadastrar
              </NavLink>
            </li>
          </>
        )}
        {user && (
          <>
            <li>
              <NavLink
                to="/posts/create"
                className={({ isActive }) => (isActive ? styles.active : "")}
                onClick={closeMenu}
              >
                Novo post
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) => (isActive ? styles.active : "")}
                onClick={closeMenu}
              >
                Dashboard
              </NavLink>
            </li>
          </>
        )}
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? styles.active : "")}
            onClick={closeMenu}
          >
            About
          </NavLink>
        </li>
        {user && (
          <li>
            <button
              onClick={() => {
                logout();
                closeMenu();
              }}
            >
              Sair
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
