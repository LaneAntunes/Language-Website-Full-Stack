import React, { useState, useEffect, useRef } from 'react';
import useScores from './Hooks/useScores'; // Adjust this import path to wherever your useScores.js file is located
import { Link } from 'react-router-dom';
import './searchTool.scss';
import { FaSearch } from 'react-icons/fa';

const SearchTool = () => {
    const { searchResults, handleSearch } = useScores();
    const [searchTerm, setSearchTerm] = useState('');

    const searchToolRef = useRef(null);

    const handleDocumentClick = (e) => {
        // Check if the click occurred outside the SearchTool component
        if (searchToolRef.current && !searchToolRef.current.contains(e.target)) {
            // Clear the search term and search results when the user clicks outside
            setSearchTerm('');
            handleSearch(''); // Clear search results by calling handleSearch with an empty string
        }
    };

    useEffect(() => {
        // Add click event listener to the document
        document.addEventListener('click', handleDocumentClick);

        // Clean up the event listener when the component is unmounted
        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []); // Empty dependency array ensures the effect runs only once on mount

    return (
        <div ref={searchToolRef} className="flex flex-col w-full justify-center items-center">
            <div className="relative w-[240px] border border-lt-blue rounded-9">
                <input
                    className="p-2 rounded-9 text-sm sm:text-base transition-colors duration-300 focus:outline-none focus:border-blue-500 focus:ring-blue-500"
                    type="text"
                    placeholder="Procure um quiz"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        handleSearch(e.target.value);
                    }}
                />
                <button
                    type="button" // Change type to "button" to prevent form submission
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 text-py-blue"
                >
                    <FaSearch />
                </button>
            </div>

            {searchResults.length > 0 && (
                <div className="w-[90vw] sm:max-w-[25vw] flex flex-wrap text-white rounded-9 bg-white z-10 text-xs items-center justify-center ">
                    {/* Render your results here */}
                    {searchResults.map((result) => (
                        <div key={result.id} className="w-full sm:w-[30vw] flex flex-wrap text-dk-blue p-3 m-1  border border-py-blue items-center  rounded-9 justify-center">
                            <Link className='font-bold text-center hover:text-sm' to={`/quiz/${result.id}`}>{result.data.title}</Link>
                            <div className='gap-2 text-py-blue flex flex-wrap justify-center text-center items-center'>
                                <p className='italic'>Nível: {result.data.level}</p>
                                <p className='text-py-green'>{result.data.description}</p>
                                <p className='italic'>Tipo: {result.data.type}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchTool;
