import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_content}>
        <div className={styles.footer_info}>
          <h3>Gabriel Malavazi</h3>
          <p>Desenvolvedor Front-end | React | JavaScript</p>
        </div>
        <div className={styles.social_links}>
          <a
            href="https://github.com/GabrielMalava"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.social_link}
          >
            GitHub
          </a>{" "}
          <a
            href="https://www.linkedin.com/in/gabriel-rodrigues-888225354/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.social_link}
          >
            LinkedIn
          </a>
          <a
            href="https://gabrielmalava.github.io/GabrielMalavazi/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.social_link}
          >
            Portfolio
          </a>
        </div>
        <p className={styles.copyright}>
          Mini Blog &copy; {new Date().getFullYear()} - Desenvolvido por Gabriel
          Malavazi
        </p>
      </div>
    </footer>
  );
};

export default Footer;
