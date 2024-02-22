import React from 'react';
import { Movie } from '@/hooks/usemovies';
import { useModal } from '@/hooks/usemodal';
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { useState } from 'react';
import useSearchMovies from '@/hooks/use-search';

interface MovieListProps {
    movies: Movie[];


}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
    // Utilisez directement useModal pour gérer l'ouverture du modal
    const { onOpen } = useModal();


    const handleMovieClick = (movie: Movie) => {
        // Ouvre le modal avec les données du film sélectionné
        onOpen("searchModal", { movie });
    }



    return (
        <ScrollArea className="h-72 w-48 rounded-md border mt-64 text-white-500">
            {movies.map((movie) => (
                <div key={movie.id} onClick={() => handleMovieClick(movie)} style={{ cursor: 'pointer' }}>
                    {movie.title}
                    <Separator className='my-2' />
                </div>


            ))}
        </ScrollArea>
    );
};

export default MovieList;

