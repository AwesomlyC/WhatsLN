import React, { useState, useRef } from 'react'
import { FaSearch } from 'react-icons/fa'
import './../styles/SearchBar.css'
import axios from 'axios';

function SearchBar({setResults}) {

  const [input, setInput] = useState("");
  const timeOut = useRef(null);

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
      }
    }, 300);
  }

  return (
      <div className='input-wrapper'>
          <FaSearch id = 'search-icon'/>
      <input placeholder="Type to search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)} />
      </div>
  )
}

export default SearchBar