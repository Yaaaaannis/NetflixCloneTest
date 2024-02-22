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

                    <div className='text-[70px] font-bold text-[#FFFFFF] pt-5 '>
                        {featuredMovie.title}</div>
                    <div className='text-[18px] font-bold'>
                        <div className='mr-[15px] inline-block text-green-400'>{featuredMovie.vote_average.toFixed(2)}</div>
                        <div className='mr-[15px] inline-block text-[#FFFFFF] '>{featuredMovie.release_date}</div>
                    </div>
                    <div>
                        <div className='mt-[15px] text-[20px] text-[#999] max-w-[70%]' >{featuredMovie.overview}</div>
                        <div><p>{featuredMovie.genres}</p></div>
                        <div className='featured--button'>
                            <AddToWatchlistButton movie={featuredMovie} />

                        </div>

                        <div className='featured--genres'>


                        </div>
                    </div>
                </div>
            </div>
        </ section>

    );
};

export default FeaturedMovieComponent;
