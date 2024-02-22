import { useState } from 'react';

const useSearchMovies = () => {
    // Retirer l'état movies si vous décidez de retourner les résultats directement depuis searchMovies
    // const [movies, setMovies] = useState<any[]>([]);

    const searchMovies = async (query: string): Promise<any[]> => {
        const apiKey = process.env.NEXT_PUBLIC_API_KEY;
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            // Au lieu de mettre à jour l'état ici, retournez directement les résultats
            return data.results;
        } catch (error) {
            console.error("Error fetching movies:", error);
            return []; // Retournez un tableau vide en cas d'erreur
        }
    };

    // Retournez uniquement la fonction searchMovies si vous choisissez de ne pas utiliser l'état movies ici
    return { searchMovies };
};

export default useSearchMovies;
