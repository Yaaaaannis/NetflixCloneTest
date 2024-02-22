// types/Movie.ts
export interface Movie {
  id: number;
  title: string;
  overview: string;
  duration?: number;
  poster_path: string;
  release_date: string;
  vote_average: number;
  genres?: string[];
}

// hooks/useSaveMovie.ts
import { db } from '../lib/firebase';
import { doc, setDoc, serverTimestamp, deleteDoc } from 'firebase/firestore';
import { useAuth } from "@/hooks/useauth";
import { Movie as MovieFromHooks } from '@/hooks/usemovies';
import { useUserMovies } from '@/hooks/useUserMovies';

export const useSaveMovie = () => {
  const { user } = useAuth();
  const { refreshMovies } = useUserMovies();

  const saveMovieToUserList = async (movie: Movie) => {
    if (!user) {
      console.log("Utilisateur non connecté.");
      return;
    }

    const movieRef = doc(db, 'users', user.uid, 'movies', movie.id.toString());

    try {
      await setDoc(movieRef, {
        ...movie,
        timestamp: serverTimestamp()
      });
      console.log("Film enregistré avec succès !");
    } catch (error) {
      console.error("Erreur lors de l'enregistrement du film :", error);
    }
  };

  const removeMovieFromUserList = async (movieId: string) => {
    if (!user) throw new Error("Utilisateur non connecté.");
    const movieRef = doc(db, 'users', user.uid, 'movies', movieId);
    await deleteDoc(movieRef);
    refreshMovies();
  };

  return { saveMovieToUserList, removeMovieFromUserList };
};
