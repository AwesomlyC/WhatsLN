import React, { useEffect, useState, useRef } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import './../styles/SearchBar.css'
import axios from 'axios';

function SearchBar({setResults, setShowResult, searchRef}) {

  const [input, setInput] = useState("");
  const timeOut = useRef(null);
  const navigate = useNavigate();


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResult(false);
      }
    };
    
    // Add event listener for clicks on document
    document.addEventListener('mousedown', handleClickOutside);
    
    // Cleanup the event listener when component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const fetchData = (value) => {
    // API Request Call
    axios.get(`http://localhost:5000/api/light-novels/search/${value}`)
      .then(function (response) {
        setResults(response.data.data);
      });

  }

  const handleChange = (value) => {
    setInput(value);
    // Call fetchData with paramater value
    clearTimeout(timeOut.current);
    // Only show possible results after a set period of time and
    // when the user stops typing.
    // Default: 300 ms
    timeOut.current = setTimeout(() => {
      if (value.length >= 3) {
        fetchData(value);
        setShowResult(true);

      }
      // Resets the "setResults" to remove the search-results-list
      else {
        setResults({})
        setShowResult(false);

      }
    }, 300);
  }
  const handleSearch = (e) => {
    // e.preventDefault();
    if (e.key === "Enter" && e.target.value && e.target.value.trim()) {
      // Search and send data
      navigate(`/search?q=${e.target.value}`)
    }
  } 
  return (
      <div className='input-wrapper' onFocus={() => setShowResult(true)}>
          <FaSearch id = 'search-icon'/>
      <input placeholder="Type to search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={(e) => handleSearch(e)}
      />
      </div>
  )
}

export default SearchBar