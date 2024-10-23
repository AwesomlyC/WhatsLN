import React, { useState, useRef } from 'react'
import './../styles/Header.css'
import { FaHome } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'
import SearchBar from './SearchBar';
import SearchResultsList from './SearchResultsList';

function Header() {

    const [searchResults, setResults] = useState([]);
    const [showResults, setShowResult] = useState(false);
    const searchRef = useRef(null);
    let navigate = useNavigate();
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <a href="/" className="logo">
                    <FaHome />
                    WhatsLN
                </a>
            </div>
            <div className="navbar-center" ref={searchRef}>
                <div className="search_bar">
                    <SearchBar setResults={setResults} setShowResult={setShowResult} searchRef={searchRef} />
                    <button className='filter-button' onClick={(e) => navigate('/filter')}>Filter</button>
                </div>
                <SearchResultsList results={searchResults} showResults={showResults} />
            </div>
            <div className="navbar-right">
                <a href='/account'>
                    <FaUserCircle size={25} color='white' />
                </a>
            </div>
        </nav>
    );
}

export default Header