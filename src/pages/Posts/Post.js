import styles from "./Post.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useState, useEffect } from "react";
import StarRating from "../../components/StarRating/StarRating";
import FavoriteButton from "../../components/FavoriteButton/FavoriteButton";
import { useAuthValue } from "../../context/AuthContext";
import { useDeleteDocument } from "../../hooks/useDeleteDocument";
// Import Swiper components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Post = () => {
  const { id } = useParams();
  const { documents } = useFetchDocuments("posts", null, null);
  const post = documents?.find((doc) => doc.id === id);
  const [rating, setRating] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [readingTime, setReadingTime] = useState(0);
  const { user } = useAuthValue();
  const navigate = useNavigate();
  const { deleteDocument } = useDeleteDocument("posts");

  const handleDelete = async () => {
    if (window.confirm("Tem certeza que deseja excluir este post?")) {
      await deleteDocument(id);
      navigate("/");
    }
  };

  // Efeito para carregar rating e favoritos
  useEffect(() => {
    // Recuperar rating do localStorage
    const savedRating = localStorage.getItem(`rating_${id}`);
    if (savedRating) {
      setRating(parseInt(savedRating));
    }

    // Recuperar estado de favorito
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favorites.includes(id));
  }, [id]);

  // Efeito separado para calcular tempo de leitura
  useEffect(() => {
    if (post?.body) {
      const words = post.body.trim().split(/\s+/).length;
      const time = Math.ceil(words / 200);
      setReadingTime(time);
    }
  }, [post?.body]);

  const handleRatingChange = (value) => {
    setRating(value);
    localStorage.setItem(`rating_${id}`, value.toString());
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
    <div className={styles.post_container}>
      {post && (
        <>
          <div className={styles.post_header}>
            <h1>{post.title}</h1>
            <div className={styles.post_info}>
              <div className={styles.author_info}>
                <p className={styles.author}>Por {post.createdBy}</p>
                <p className={styles.reading_time}>
                  {readingTime} min de leitura
                </p>
              </div>
              <div className={styles.interactions}>
                <StarRating
                  initialRating={rating}
                  onRatingChange={handleRatingChange}
                />
                <FavoriteButton
                  initialState={isFavorite}
                  onToggle={(favState) => handleFavoriteToggle(id, favState)}
                  postId={id}
                />
              </div>
            </div>
          </div>{" "}
          <div className={styles.image_carousel}>
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              navigation={
                post.additionalImages && post.additionalImages.length > 0
              }
              pagination={
                post.additionalImages && post.additionalImages.length > 0
                  ? { clickable: true }
                  : false
              }
              autoplay={
                post.additionalImages && post.additionalImages.length > 0
                  ? { delay: 5000, disableOnInteraction: false }
                  : false
              }
              loop={post.additionalImages && post.additionalImages.length > 0}
            >
              {/* Show the main image first */}
              <SwiperSlide className={styles.carousel_slide}>
                <img src={post.image} alt={post.title} />
              </SwiperSlide>{" "}
              {/* Show additional images if they exist */}
              {post.additionalImages &&
                post.additionalImages.length > 0 &&
                post.additionalImages.map((imgUrl, index) => (
                  <SwiperSlide key={index} className={styles.carousel_slide}>
                    <img
                      src={imgUrl}
                      alt={`${post.title} - View ${index + 2}`}
                    />
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>{" "}
          <div className={styles.post_content}>
            <div className={styles.tags}>
              {post.tags &&
                post.tags.length > 0 &&
                post.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    <span>#</span>
                    {tag}
                  </span>
                ))}
            </div>{" "}
            <div className={styles.body}>
              {post.body &&
                post.body
                  .split("\n")
                  .map(
                    (paragraph, i) => paragraph && <p key={i}>{paragraph}</p>
                  )}
            </div>
            {user && user.uid === post.uid && (
              <button onClick={handleDelete} className={styles.delete_btn}>
                Excluir Post
              </button>
            )}
          </div>
          <div className={styles.share_section}>
            <h3>Compartilhe este post</h3>
            <div className={styles.share_buttons}>
              <button
                className={styles.share_button}
                onClick={() =>
                  navigator.clipboard.writeText(window.location.href)
                }
              >
                Copiar Link
              </button>
            </div>
          </div>
          {user && user.uid === post.createdBy && (
            <div className={styles.admin_section}>
              <button className={styles.delete_button} onClick={handleDelete}>
                Deletar Post
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Post;
