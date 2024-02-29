import React, { useState } from 'react';
import useSearchMovies from '@/hooks/use-search';
import { FiSearch } from 'react-icons/fi'; // Importez l'icône de recherche de react-icons ou votre bibliothèque d'icônes préférée

interface SearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const toggleSearchBar = () => setIsOpen(!isOpen);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSearch(query);
        setQuery('');
    };

    return (
        <div className="flex justify-center items-center w-full px-4 py-2">
            <button
                onClick={toggleSearchBar}
                className="px-4 py-2 text-white hover:text-gray-300 focus:outline-none"
            >
                <FiSearch size={24} /> {/* Utilisez l'icône de loupe */}
            </button>
            {isOpen && ( // Utilisez && au lieu de || pour afficher la barre de recherche uniquement si isOpen est vrai
                <form onSubmit={handleSubmit} className="flex w-full max-w-xl border border-gray-300 rounded overflow-hidden">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Rechercher un film..."
                        className="flex-1 px-4 py-2 text-sm text-gray-700 placeholder-gray-400 bg-white outline-none"
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 bg-transparent text-white text-sm font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                    >
                        <FiSearch size={24} /> {/* Utilisez l'icône de loupe pour le bouton de soumission également */}
                    </button>
                </form>
            )}
        </div>
    );
};

export default SearchBar;
