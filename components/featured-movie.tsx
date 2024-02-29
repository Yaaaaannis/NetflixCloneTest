import React from 'react';
import { useMovies } from '@/hooks/usemovies';

import Image from 'next/image';

import AddToWatchlistButton from './add-to-wathlist-button';


const FeaturedMovieComponent = () => {
    const { featuredMovie } = useMovies();

    if (!featuredMovie) return null;


    return (
        <section className='h-[100vh]' style={{
            backgroundSize: "cover",
            backgroundImage: `url(https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path})`,
            backgroundPosition: "center center",
        }}>
            <div style={{
                width: 'inherit',
                height: 'inherit',
                background: 'linear-gradient(to top, #111 10%, transparent 90%)',
            }}>
                {/* Add a valid JSX expression here */}

                <div className="flex flex-col" style={{
                    width: "100%",
                    height: "inherit",
                    background: "linear-gradient(to right, #111 15%, transparent 70%)",
                    paddingLeft: "30px",
                    paddingBottom: "150px",
                    paddingTop: "150px", // Assurez-vous d'inclure l'unité "px"
                    zIndex: 999,
                }}>

                    <div className='text-5xl font-bold text-white pt-5 mb-4 lg:text-6xl '>
                        {featuredMovie.title}</div>
                    <div className='text-[18px] font-bold'>
                        <div className='mr-[15px] inline-block text-green-400'>{featuredMovie.vote_average.toFixed(2)}</div>
                        <div className='mr-[15px] inline-block text-[#FFFFFF] '>{featuredMovie.release_date}</div>
                    </div>
                    <div className='pb-10'>
                        <div className='text-xl text-gray-400 max-w-[70%] max-h-[60%] lg:max-w-[60%] sm:overflow-hidden sm:text-ellipsis sm:whitespace-nowrap'>{featuredMovie.overview}
                        </div>

                    </div>
                    <AddToWatchlistButton movie={featuredMovie} />
                </div>
            </div>
        </ section >

    );
};

export default FeaturedMovieComponent;
