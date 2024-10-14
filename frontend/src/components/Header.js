import React, { useState } from 'react'
import './../styles/Header.css'
import { FaHome } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'
import SearchBar from './SearchBar';
import SearchResultsList from './SearchResultsList';

function Header() {

    const [searchResults, setResults] = useState([]);
    let navigate = useNavigate();
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <a href="/" className="logo">
                    <FaHome />
                    WhatsLN
                </a>
            </div>
            <div className="navbar-center">
                <div className="search_bar">
                    <SearchBar setResults={setResults} />
                    <button onClick={(e) => navigate('/filter')}>Filter</button>
                </div>
                <SearchResultsList results={searchResults} />
            </div>
            <div className="navbar-right">
                <a href="/" className="cart-icon">
                    <i className="fas fa-shopping-cart"></i>
                    <span className="cart-count">0</span>
                </a>
                <a href="/" className="user-icon">
                    <i className="fas fa-user"></i>
                </a>
            </div>
        </nav>
    );
}

export default Header