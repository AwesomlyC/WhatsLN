import React, { useState, useRef } from 'react'
import { FaSearch } from 'react-icons/fa'
import './../styles/SearchBar.css'
import axios from 'axios';

function SearchBar({setResults}) {

  const [input, setInput] = useState("");
  const timeOut = useRef(null);

  const fetchData = (value) => {
    // API Request Call
    // console.log(`https://api.jikan.moe/v4/manga?q=bungaku`);
    // axios.get(`https://api.jikan.moe/v4/manga?q=${value}`)
    //   .then((response) => response.json())
    //   .then((json) => {
    //     // console.log(json);
    //     const results = json.filter((user) => {
    //       // console.log(value);
    //       return value && (value.length >= 0) && user && user.name && user.name.toLowerCase().includes(value);
    //     })
    //     console.log(results);
    //     setResults(results);
    //   });
  }

  const handleChange = (value) => {
    setInput(value);
    // Call fetchData with paramater value
    // clearTimeout(timeOut.current);
    // fetchData(value);
    // Only show possible results after a set period of time and
    // when the user stops typing.
    // Default: 300 ms
    timeOut.current = setTimeout(() => {
      fetchData(value);
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