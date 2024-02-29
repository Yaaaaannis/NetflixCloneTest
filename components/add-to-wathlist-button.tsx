// components/AddToWatchlistButton.tsx
import React from 'react';
import { Movie } from '@/hooks/usemovies';
import { useAuth } from '@/hooks/useauth';
import { useSaveMovie } from './save-to-watchlist';
import { useToast } from "@/components/ui/use-toast"
interface AddToWatchlistButtonProps {
    movie: Movie;
}



const AddToWatchlistButton: React.FC<AddToWatchlistButtonProps> = ({ movie }) => {
    const { user } = useAuth();
    const { saveMovieToUserList } = useSaveMovie();
    const { toast } = useToast();

    const handleAddToWatchlist = async () => {
        if (!user) {
            alert("Veuillez vous connecter pour ajouter des films à votre watchlist.");
            return;
        }
        try {
            await saveMovieToUserList(movie);
            toast({
                title: `${movie.title} ajouté a la Watchlist !`,
            })
        } catch (error) {
            console.error("Erreur lors de l'ajout du film à la watchlist :", error);
            alert("Une erreur est survenue lors de l'ajout du film à la watchlist.");
        }
    };

    return (
        <button onClick={handleAddToWatchlist} className="px-4 py-2 bg-red-600  text-white rounded-2xl hover:bg-red-700 transition-colors">
            Ajouter à la Watchlist
        </button>
    );
};

export default AddToWatchlistButton;
