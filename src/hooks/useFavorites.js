import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
  doc,
  setDoc,
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

export const useFavorites = (userId) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Carregar favoritos do usuário
  useEffect(() => {
    const loadFavorites = async () => {
      if (!userId) return;

      setLoading(true);
      try {
        const q = query(
          collection(db, "favorites"),
          where("userId", "==", userId)
        );
        const querySnapshot = await getDocs(q);
        const userFavorites = [];
        querySnapshot.forEach((doc) => {
          userFavorites.push(doc.data().postId);
        });
        setFavorites(userFavorites);
      } catch (error) {
        console.error("Erro ao carregar favoritos:", error);
        setError(error.message);
      }
      setLoading(false);
    };

    loadFavorites();
  }, [userId]);

  const addFavorite = async (postId) => {
    if (!userId) return;

    try {
      const favoriteId = `${userId}_${postId}`;
      await setDoc(doc(db, "favorites", favoriteId), {
        userId,
        postId,
        createdAt: new Date(),
      });
      setFavorites((prev) => [...prev, postId]);
    } catch (error) {
      console.error("Erro ao adicionar favorito:", error);
      setError(error.message);
    }
  };

  const removeFavorite = async (postId) => {
    if (!userId) return;

    try {
      const favoriteId = `${userId}_${postId}`;
      await deleteDoc(doc(db, "favorites", favoriteId));
      setFavorites((prev) => prev.filter((id) => id !== postId));
    } catch (error) {
      console.error("Erro ao remover favorito:", error);
      setError(error.message);
    }
  };

  const isFavorite = (postId) => {
    return favorites.includes(postId);
  };

  return {
    favorites,
    loading,
    error,
    addFavorite,
    removeFavorite,
    isFavorite,
  };
};
