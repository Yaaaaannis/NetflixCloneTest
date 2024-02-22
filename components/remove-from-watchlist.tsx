// components/RemoveFromWatchlistButton.tsx
import React from 'react';
import { useSaveMovie } from './save-to-watchlist';
import { useUserMovies } from '@/hooks/useUserMovies';


interface RemoveFromWatchlistButtonProps {
    movieId: string;
    onRemove: () => void;
}

const RemoveFromWatchlistButton: React.FC<RemoveFromWatchlistButtonProps> = ({ movieId, onRemove }) => {
    const { removeMovieFromUserList } = useSaveMovie();
    const { refreshMovies } = useUserMovies();


    const handleRemoveFromWatchlist = async () => {
        try {
            await removeMovieFromUserList(movieId);
            onRemove(); // Utilisez le callback ici si nécessaire
            alert("Film retiré de la watchlist avec succès !");
        } catch (error) {
            console.error("Erreur lors de la suppression du film de la watchlist :", error);
            alert("Une erreur est survenue lors de la suppression du film de la watchlist.");
        }
    };

    return (
        <button onClick={handleRemoveFromWatchlist} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700">
            Retirer de la Watchlist
        </button>
    );
};

export default RemoveFromWatchlistButton;
