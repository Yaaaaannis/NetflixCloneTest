// components/UserMoviesList.tsx
"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/hooks/useauth';
import { useUserMovies } from '@/hooks/useUserMovies';
import RemoveFromWatchlistButton from '@/components/remove-from-watchlist';
import Header from '@/components/header';
import { Movie } from '@/hooks/usemovies';
import { useModal } from '@/hooks/usemodal';
import { Modal } from '@/components/modals/modal';


const UserMoviesList: React.FC = () => {
    const { movies, refreshMovies } = useUserMovies();
    const router = useRouter();
    const { user, loading } = useAuth();


    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { onOpen } = useModal();


    const openFilmModal = (movie: Movie) => {
        onOpen("filmModal", { movie });
    }

    const openModal = (movie: Movie) => {
        setSelectedMovie(movie);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Redirection si non connecté
    useEffect(() => {
        if (!loading && !user) {
            router.push('/pages/signin');
        }
    }, [user, loading, router]);

    return (
        <div className='bg-[#141414] min-h-screen'>
            <Header />
            <div className="text-center my-8 bg-[#141414]" >
                <h2 className="text-2xl font-bold">Mes films enregistrés</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-4  ">
                {movies.map((movie) => (
                    <div key={movie.id} className="flex flex-col items-center cursor-pointer">
                        <Image
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            width={200}
                            height={300}
                            className="rounded-lg shadow-lg"
                            onClick={() => openFilmModal(movie)}
                        />
                        <h3 className="text-sm mt-2 text-white ">{movie.title}</h3>
                        <Modal />
                    </div>
                ))}

            </div>

        </div>
    );
};

export default UserMoviesList;
