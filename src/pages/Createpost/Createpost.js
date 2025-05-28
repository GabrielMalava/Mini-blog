import styles from "./Createpost.module.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from "../../hooks/useInsertDocument";

const Createpost = () => {
  const [title, setTitle] = useState("");
  const [images, setImages] = useState([""]);
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [formError, setFormError] = useState("");

  const { user } = useAuthValue();
  const { insertDocument, response } = useInsertDocument("posts");
  const navigate = useNavigate();

  const handleAddImageField = () => {
    setImages([...images, ""]);
  };

  const handleImageChange = (index, value) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
  };

  const handleRemoveImageField = (index) => {
    if (images.length > 1) {
      const newImages = images.filter((_, i) => i !== index);
      setImages(newImages);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    const imageUrls = images.filter((url) => url.trim());

    if (imageUrls.length === 0) {
      setFormError("Insira pelo menos uma URL de imagem.");
      return;
    }

    for (const url of imageUrls) {
      try {
        new URL(url);
      } catch (error) {
        setFormError("Uma ou mais URLs de imagem são inválidas.");
        return;
      }
    }

    if (!title || !tags || !body) {
      setFormError("Por favor, preencha todos os campos!");
      return;
    }

    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());
    const [mainImage, ...additionalImages] = imageUrls;

    insertDocument({
      title,
      image: mainImage,
      additionalImages,
      body,
      tags: tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });

    navigate("/");
  };

  return (
    <div className={styles.create_post}>
      <h2>Criar post</h2>
      <p>Escreva sobre o que quiser compartilhe o seu conhecimento!</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Título:</span>
          <input
            type="text"
            name="title"
            required
            placeholder="Pense em um bom título"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </label>
        <div className={styles.image_fields}>
          <span>URLs das imagens:</span>
          {images.map((image, index) => (
            <div key={index} className={styles.image_field}>
              <input
                type="text"
                placeholder="Insira a URL da imagem"
                value={image}
                onChange={(e) => handleImageChange(index, e.target.value)}
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => handleRemoveImageField(index)}
                  className={styles.remove_btn}
                >
                  Remover
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddImageField}
            className={styles.add_btn}
          >
            Adicionar mais uma imagem
          </button>
        </div>
        <label>
          <span>Conteúdo:</span>
          <textarea
            name="body"
            required
            placeholder="Insira o conteúdo do post"
            onChange={(e) => setBody(e.target.value)}
            value={body}
          ></textarea>
        </label>
        <label>
          <span>Tags:</span>
          <input
            type="text"
            name="tags"
            required
            placeholder="Insira as tags separadas por vírgula"
            onChange={(e) => setTags(e.target.value)}
            value={tags}
          />
        </label>
        {!response.loading && <button className="btn">Cadastrar</button>}
        {response.loading && (
          <button className="btn" disabled>
            Aguarde...
          </button>
        )}
        {response.error && <p className="error">{response.error}</p>}
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default Createpost;
