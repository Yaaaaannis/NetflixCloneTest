// components/SearchMoviesComponent.tsx
import React, { useState, useEffect, useRef } from 'react';
import SearchBar from './searchbar';
import { Movie } from '@/hooks/usemovies';
import MovieList from './movie-list';
import useSearchMovies from '@/hooks/use-search';
import { useModal } from '@/hooks/usemodal';

const SearchMoviesComponent = () => {
    const { searchMovies } = useSearchMovies();
    const [searchResults, setSearchResults] = useState<Movie[]>([]); // Add type annotation for searchResults
    const { isOpen } = useModal();
    const [showMovieList, setShowMovieList] = useState(true);

    const movieListRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            setShowMovieList(false);
        }
    }, [isOpen]);
    const handleSearch = async (query: string) => {
        if (!query.trim()) {
            setSearchResults([]);

            return;
        }
        const results = await searchMovies(query);
        setSearchResults(results || []);
        setShowMovieList(true); // Force la mise à jour de showMovieList à true
    };



    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (movieListRef.current && !movieListRef.current.contains(event.target as Node)) {
                setShowMovieList(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    return (
        <div>
            <SearchBar onSearch={handleSearch} />
            {showMovieList && searchResults.length > 0 && (
                <div ref={movieListRef}>
                    <MovieList movies={searchResults} />
                </div>
            )}
        </div>
    );
};

export default SearchMoviesComponent;
