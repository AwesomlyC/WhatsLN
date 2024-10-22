import React, { useState } from 'react'
import './../styles/FilterNovel.css'
import axios from 'axios';

import { FaSearch } from 'react-icons/fa'

const API_URL = 'http://localhost:5000/api/light-novels'
function FilterNovel() {
    const [type, setType] = useState('all');
    const [status, setStatus] = useState('all');
    // const [minScore, setMinScore] = useState('');
    // const [maxScore, setMaxScore] = useState('');
    const [sfw, setSFW] = useState('true');
    const [query, setQuery] = useState("");
    
    const [numOfResults, setNumOfResults] = useState(0);
    const [novels, setNovels] = useState([]);

    const findNovels = (event) => {
        console.log("FINDNOVELS: " + query);
        let queryParams = [
            type ? `type=${type}` : '',
            status ? `status=${status}` : '',
            sfw ? `sfw=${sfw}` : '',
            query ? `q=${query}` : ''
            ].filter(Boolean).join('&');
        console.log("FINDNOVELS: " + queryParams);
        
        axios.get(API_URL + `/filter?${queryParams}`).then(function (response) {
            setNovels(response.data.data);
            setNumOfResults(response.data.pagination.items.total);
        });
    }


    const handleChange = (value) => {
        setQuery(value);
    }
    return (
        <div className="filter-menu">

            <h3>Filter</h3>
            <div className='options'>
                
                <div>
                    <div className='box'>
                        <text className='label'>Type</text>
                        <select value={type} onChange={(e) => setType(e.target.value)}>
                            <option value="all">All</option>
                            <option value="lightNovel">Light Novel</option>
                            <option value="manga">Manga</option>
                            <option value="novel">Novel</option>
                            <option value="manhwa">Manhwa</option>
                            <option value="manhua">Manhua</option>
                        </select>
                    </div>
                    <div className="box">
                        <text className="label">Status</text>
                        <select value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="all">All</option>
                            <option value="publishing">Publishing</option>
                            <option value="complete">Complete</option>
                            <option value="hiatus">Hiatus</option>
                            <option value="discontinued">Discontinued</option>
                            <option value="upcoming">Upcoming</option>
                        </select>
                    </div>
                    <div className="box">
                        <text className='label'>SFW</text>
                        <select value={sfw} onChange={(e) => setSFW(e.target.value)}>
                            <option value="true">On</option>
                            <option value="false">Off</option>
                        </select>
                    </div>
                </div>

            <div className='input-wrapper'>
                {/* <FaSearch id = 'search-icon'/> */}
                <input placeholder="Filter by name..."
                    value={query}
                    onChange={(e) => handleChange(e.target.value)}
                />
            </div>

            <button className='filter-novel' onClick={(e) => findNovels(e)}><b>Filter</b></button>
            </div>

            <div className="results">
                <div className="result_title">
                    <text className='result'>Results</text>
                    <text className='result_count'>{ numOfResults} results</text>
                </div>
                <div className="recommendations" id='filter'>
                    {/* Add a text field for when there are no recommendations */}
                    {novels.map(novel => (
                        <li key={novel.mal_id}>
                            <img src={novel.images.jpg.image_url} alt={novel.images.webp.image_url} />
                            <h3>
                                <a href={`http://localhost:3000/single-ln?id=${novel.mal_id}`}>{novel.title}</a>
                            </h3>
                        </li>
                    ))}
                </div>

            </div>
        </div>
  )
}

export default FilterNovel