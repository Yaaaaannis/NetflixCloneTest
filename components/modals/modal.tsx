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
import { useUserMovies } from '@/hooks/useUserMovies';
import RemoveFromWatchlistButton from '../remove-from-watchlist';




interface MovieModalProps {
    movie: Movie;
}


export const Modal = () => {
    const { isOpen, onClose, type, data } = useModal();
    const { user } = useAuth();
    const { saveMovieToUserList } = useSaveMovie();
    const { toast } = useToast();
    const { movies, refreshMovies } = useUserMovies();


    if (!isOpen || type !== "filmModal" || !data.movie) return null;


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
        <Dialog open={isOpen} onOpenChange={() => onClose()} >
            <DialogContent className="bg-white text-black p-6 md:p-8 w-full sm:w-4/5 max-w-3xl mx-auto my-8 rounded-lg shadow-lg flex flex-col justify-center">
                <DialogHeader>
                    <DialogTitle className="text-2xl md:text-3xl font-bold text-center">{movie.title}</DialogTitle>
                    {movie.overview && (
                        <DialogDescription className="mt-4 md:mt-8 overflow-auto max-h-[10em] text-gray-600 text-center">
                            <p>{movie.overview}</p>

                        </DialogDescription>
                    )}
                </DialogHeader>
                <div className="flex flex-col mt-4 justify-center items-center">
                    <Image
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        width={200}
                        height={500}
                        className="rounded-lg"
                    />
                    <div className='flex flex-col justify-center items-center' >
                        <p className='text-sm font-bold pt-2'>{movie.release_date}</p>
                        <p className='bg-green-500 text-xs font-bold px-3 py-1 rounded-full mt-2'>{movie.vote_average}</p>
                        <p className='mt-2'>{movie.duration}</p>
                        <p className='mt-2'>{movie.genres}</p>
                    </div>
                </div>
                <DialogFooter className="flex justify-center mt-4">
                    <button
                        onClick={handleSaveMovie}
                        className='px-4 md:px-8 py-2 bg-red-500 hover:bg-red-700 text-white font-bold rounded'>Add to Watchlist</button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};