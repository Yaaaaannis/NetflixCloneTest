import React, { useState } from 'react';
import useSearchMovies from '@/hooks/use-search';
import { set } from 'react-hook-form';


interface SearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [query, setQuery] = useState('');






    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSearch(query);
        setQuery('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher un film..."
            />
            <button
                type="submit" className='bg-red-500 '>Rechercher</button>
        </form>
    );
};

export default SearchBar;
