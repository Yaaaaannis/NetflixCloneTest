"use client"

import React, { useEffect, useState, useRef } from 'react';
// import "./Header.css";
const API_KEY = process.env.REACT_APP_API_KEY

import { useAuth } from "@/hooks/useauth";
import Image from 'next/image';
import { useMovies } from '@/hooks/usemovies';
import SearchBar from './searchbar';
import SearchMoviesComponent from './search-movies';
import MovieModal from './modals/movie-modal';
import { useModal } from '@/hooks/usemodal';
import { useRouter } from 'next/navigation';
import MovieList from './movie-list';
import Link from 'next/link';


const Header = () => {

    const { user, signOutUser } = useAuth();
    const { searchMovies } = useMovies();
    const [showMovieList, setShowMovieList] = useState(true);
    const { isOpen, onOpen, onClose } = useModal();
    const [movies, setMovies] = useState<any[]>([]);
    const router = useRouter();


    useEffect(() => {
        if (typeof window !== "undefined") {
            console.log(window.location.href); // Accès sécurisé à location
        }
    }, []);
    return (
        <header className="  top-0 left-0 right-0  h-[80px] flex justify-between items-center px-0 py-[30px] bg-[#141414a6] transition-all ease-0.5 qsd z-50 fixed ">
            <div className=" w-32 ">
                <Link href="/">
                    <Image
                        src="https://images.ctfassets.net/4cd45et68cgf/7LrExJ6PAj6MSIPkDyCO86/542b1dfabbf3959908f69be546879952/Netflix-Brand-Logo.png?w=684&h=456"
                        alt="logo"
                        width={684}
                        height={456}
                    />
                </Link>
            </div>
            <div className="h-[100%] flex items-center gap-[20px]">
                <SearchMoviesComponent />
                <div>
                    {/* <SearchBar onSearch={handleMovieSelect} /> */}
                </div>
                <div>
                    <MovieModal />
                </div>


                <div className="p-10">
                    <Link href="/">
                        <Image
                            className="rounded-full h-14"
                            src={user?.photoURL || '/img/netflix-avatar.png'}
                            alt="profil"
                            width={50}
                            height={50}
                        />
                    </Link>
                </div>
                <div className='header-watchlist'>
                    <button
                        onClick={() => router.push('/pages/watchlist')}
                        className='bg-white rounded-full bold uppercase text-xl m-5 p-3'>
                        Watchlist
                    </button>
                </div>
                <div>
                    <button
                        onClick={signOutUser}
                        className='bg-white rounded-full bold uppercase text-xl m-5 p-3'>
                        Deconnexion

                    </button>
                </div>

            </div>
        </header >
    );
}

export default Header;