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



interface MovieModalProps {
    movie: Movie;
}


export const Modal = () => {
    const { isOpen, onClose, type, data } = useModal();
    const { saveMovieToUserList } = useSaveMovie();

    if (!isOpen || type !== "filmModal" || !data.movie) return null;


    const movie: Movie = data.movie;

    const handleSaveMovie = async () => {

        await saveMovieToUserList(movie);
    };

    return (
        <Dialog open={isOpen} onOpenChange={() => onClose()} >
            <DialogContent className="bg-white text-black max-h-50 p-6 md:p-8 max-w-3xl mx-auto my-8 rounded-lg shadow-lg flex flex-col justify-center">
                <DialogHeader>
                    <DialogTitle className="text-3xl font-bold text-center items-center">{movie.title}</DialogTitle>
                    {movie.overview && (
                        <DialogDescription className="mt-8 flex text-gray-600 justify-center items-center flex-col">
                            <p>{movie.overview}</p>
                            <p className='text-sm bold pb-1'>{movie.release_date}</p>
                            <p className=' text-green-400 text-xs'>{movie.vote_average}</p>
                            <p className=''>{movie.duration}</p>
                            <p className=''>{movie.genres}</p>


                        </DialogDescription>
                    )}
                </DialogHeader>
                <div className=" flex mt-4 items-center justify-center">
                    <Image
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        width={200} // Ajustez selon votre mise en page
                        height={500}
                        className="rounded-lg"

                    />
                </div>
                <DialogFooter className="flex  mt-4 items-center">
                    <button
                        onClick={handleSaveMovie}
                        className='px-8'>Add to Watchlist</button>
                    <button
                        onClick={() => onClose()}
                        className="flex px-4 py-2 bg-red-600  text-white rounded-2xl hover:bg-red-700 transition-colors  "
                    >
                        Close
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
