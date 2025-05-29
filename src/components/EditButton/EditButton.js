import { FaPencilAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styles from "./EditButton.module.css";

const EditButton = ({ postId, showLabel = false }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/posts/edit/${postId}`);
  };

  return (
    <button
      onClick={handleEdit}
      className={styles.edit_button}
      title="Editar post"
    >
      <FaPencilAlt />
      {showLabel && <span>Editar</span>}
    </button>
  );
};

export default EditButton;
