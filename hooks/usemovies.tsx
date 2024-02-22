import { useEffect, useState } from 'react';

export interface Movie {
    id: number;
    title: string;
    overview: string;
    duration?: number; // Durée pourrait ne pas être disponible immédiatement
    poster_path: string; // Chemin relatif de l'image du film
    release_date: string; // Date de sortie
    vote_average: number; // Note moyenne
    genres: string[]; // Liste des genres
    backdrop_path: string; // Chemin relatif de l'image de fond


}
export interface ModalData {
    movie?: Movie;
}

interface Category {
    slug: string;
    title: string;
    movies: Movie[];
}

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const API_URL = "https://api.themoviedb.org/3/";

const fetchMoviesFromCategory = async (slug: string): Promise<Movie[]> => {
    const url = `${API_URL}movie/${slug}?api_key=${API_KEY}&language=fr-FR`;
    const response = await fetch(url);
    const data = await response.json();
    return data.results || [];
};

export const useMovies = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null); // Nouvel état pour le film en vedette
    const [searchResults, setSearchResults] = useState<Movie[]>([]);

    const searchMovies = async (query: string): Promise<void> => {
        if (!query.trim()) {
            setSearchResults([]);
            return;
        }

        const url = `${API_URL}search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=fr-FR`;
        const response = await fetch(url);
        const data = await response.json();
        setSearchResults(data.results || []);
    };

    useEffect(() => {
        const slugs = ['top_rated', 'upcoming', 'popular']; // Exemple de catégories
        const fetchAllCategories = async () => {
            const categoriesData: Category[] = await Promise.all(
                slugs.map(async (slug) => {
                    const movies = await fetchMoviesFromCategory(slug);
                    return {
                        slug,
                        title: slug.replace('_', ' ').toUpperCase(), // Transforme le slug en titre
                        movies,
                    };
                })
            );
            setCategories(categoriesData);


            const allMovies = categoriesData.flatMap(category => category.movies);
            if (allMovies.length > 0) {
                const randomIndex = Math.floor(Math.random() * allMovies.length);
                setFeaturedMovie(allMovies[randomIndex]);
            }

        };


        fetchAllCategories();
    }, []);

    return { categories, featuredMovie, searchMovies, searchResults };

};

