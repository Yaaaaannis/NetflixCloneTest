// components/RemoveFromWatchlistButton.tsx
import React from 'react';
import { useSaveMovie } from './save-to-watchlist';
import { useUserMovies } from '@/hooks/useUserMovies';
import { useToast } from "@/components/ui/use-toast"
import { Movie } from '@/hooks/usemovies';


interface RemoveFromWatchlistButtonProps {
    movieId: string;
    onRemove: () => void;
    movie: Movie;
}

const RemoveFromWatchlistButton: React.FC<RemoveFromWatchlistButtonProps> = ({ movieId, onRemove, movie }) => {
    const { removeMovieFromUserList } = useSaveMovie();
    const { refreshMovies } = useUserMovies();

    const { toast } = useToast();


    const handleRemoveFromWatchlist = async () => {
        try {
            await removeMovieFromUserList(movieId);
            onRemove(); // Utilisez le callback ici si nécessaire
            toast({
                title: `${movie.title} retiré de la Watchlist!`,
            })
        } catch (error) {
            console.error("Erreur lors de la suppression du film de la watchlist :", error);
            alert("Une erreur est survenue lors de la suppression du film de la watchlist.");
        }
    };

    return (
        <button onClick={handleRemoveFromWatchlist} className="px-2 py-2 bg-red-500 text-white  hover:bg-red-700 rounded-xl">
            Retirer de la Watchlist
        </button>
    );
};

export default RemoveFromWatchlistButton;
