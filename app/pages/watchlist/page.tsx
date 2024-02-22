// components/UserMoviesList.tsx
"use client"

import Header from '@/components/header';
import RemoveFromWatchlistButton from '@/components/remove-from-watchlist';
import { useUserMovies } from '@/hooks/useUserMovies';
import Image from 'next/image';






const UserMoviesList: React.FC = () => {
    const { movies, refreshMovies } = useUserMovies();

    return (
        <div>
            <Header />
            <h2>Mes films enregistrés</h2>
            <ul>
                {movies.map((movie) => (
                    <li key={movie.id}>
                        {movie.title} - Note: {movie.vote_average}
                        <Image src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} width={300} height={500} />
                        <RemoveFromWatchlistButton movieId={movie.id.toString()} onRemove={refreshMovies} />

                    </li>

                ))}
            </ul>
        </div>
    );
};

export default UserMoviesList;
