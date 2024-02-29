import React from 'react';
import Image from 'next/image';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { useModal } from '@/hooks/usemodal';
import { Movie } from '@/hooks/usemovies';
import { useSaveMovie } from '@/components/save-to-watchlist';
import { useAuth } from '@/hooks/useauth';
import { useToast } from "@/components/ui/use-toast"





export interface MovieModalProps {
    movie: Movie;
    isOpen: boolean;
    onClose: () => void;

}

const MovieModal: React.FC = () => {
    const { isOpen, type, data, onClose } = useModal();
    const { saveMovieToUserList } = useSaveMovie();
    const { user } = useAuth();
    const { toast } = useToast();

    if (!isOpen || type !== "searchModal" || !data.movie) return null;
    const movie: Movie = data.movie;




    const handleSaveMovie = async () => {
        if (user) {
            await saveMovieToUserList(movie);
            toast({
                title: `${movie.title} ajouté a la Watchlist !`,
            })
        } else {
            alert("Veuillez vous connecter pour ajouter des films à votre watchlist.");
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose} >
            <DialogContent className="bg-white text-black p-6 md:p-8 max-w-3xl max-h-50  mx-auto my-8 rounded-lg shadow-lg flex flex-col justify-center">
                <DialogHeader>
                    <DialogTitle className="text-3xl font-bold text-center items-center">{movie.title}</DialogTitle>
                </DialogHeader>
                {movie.overview && (
                    <DialogDescription className="mt-8 flex text-gray-600 justify-center items-center flex-col">
                        <p>{movie.overview}</p>
                    </DialogDescription>
                )}
                <div className="flex mt-4 items-center justify-center">
                    <Image
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        width={200}
                        height={400}
                        className="rounded-lg"
                    />
                </div>
                <div className="mt-4 flex flex-col items-center">
                    <span className="bg-green-500 text-xs font-bold px-3 py-1 rounded-full">Note : {movie.vote_average}</span>
                    <span className="mt-2">Sortie : {movie.release_date}</span>
                    {/* Générer la liste des genres si disponible */}
                </div>
                <DialogFooter className="flex  mt-4 items-center">
                    <button
                        onClick={handleSaveMovie}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Ajouter à la watchlist
                    </button>

                    <button
                        onClick={onClose}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Fermer
                    </button>

                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default MovieModal;
