// hooks/useUserMovies.ts
import { useState, useEffect } from 'react';
import { useAuth } from './useauth';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Movie } from './usemovies';

export const useUserMovies = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const { user } = useAuth();
    const [refreshIndicator, setRefreshIndicator] = useState(0);

    const refreshMovies = () => {
        setRefreshIndicator((prev) => prev + 1);

    }


    useEffect(() => {
        const fetchUserMovies = async () => {
            if (user) {
                const q = query(collection(db, 'users', user.uid, 'movies'));
                const querySnapshot = await getDocs(q);
                const userMovies: Movie[] = [];
                querySnapshot.forEach((doc) => {
                    userMovies.push(doc.data() as Movie);
                });
                setMovies(userMovies);
            } else {
                setMovies([]); // Assurez-vous de vider la liste des films si aucun utilisateur n'est connecté
            }
        };

        fetchUserMovies();
    }, [user, refreshIndicator]);

    return { movies, refreshMovies };
};
