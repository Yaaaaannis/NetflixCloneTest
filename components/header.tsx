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

    const { user, signOutUser, loading } = useAuth();
    const { searchMovies } = useMovies();
    const [showMovieList, setShowMovieList] = useState(true);
    const { isOpen, onOpen, onClose } = useModal();
    const [movies, setMovies] = useState<any[]>([]);
    const router = useRouter();




    return (
        <header className="top-0 left-0 right-0 h-[80px] flex items-center justify-between px-4 bg-[#141414] z-50 fixed md:px-6 lg:px-8">
            <div className="flex items-center">
                <a href="/">
                    <Image
                        src="https://images.ctfassets.net/4cd45et68cgf/7LrExJ6PAj6MSIPkDyCO86/542b1dfabbf3959908f69be546879952/Netflix-Brand-Logo.png"
                        alt="logo"
                        width={100}
                        height={30}
                        layout="intrinsic"
                    />
                </a>
            </div>
            <div className="flex items-center gap-2 md:gap-4">
                <SearchMoviesComponent />
                <MovieModal />
                <div >

                    <Image
                        className="rounded-full"
                        src={user?.photoURL || '/img/netflix-avatar.png'}
                        alt="profil"
                        width={40}
                        height={40}
                        layout='fixed'
                    />

                </div>
                <button
                    onClick={() => router.push('/pages/watchlist')}
                    className="bg-white text-black rounded-full text-xs px-4 py-2 uppercase hover:bg-opacity-90 transition duration-150 ease-in-out md:text-sm lg:px-5 lg:py-2.5">
                    Watchlist
                </button>
                <button
                    onClick={signOutUser}
                    className="bg-white text-black rounded-full text-xs px-4 py-2 uppercase hover:bg-opacity-90 transition duration-150 ease-in-out md:text-sm lg:px-5 lg:py-2.5">
                    Déconnexion
                </button>
            </div>
        </header>
    );
}

export default Header;