import React, { useEffect, useState }  from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios';
import NovelResults from './NovelResults';
import ViewToggle from './ViewToggle';
function SearchPage() {

    const location = useLocation();
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [viewIndex, setViewIndex] = useState(0);
    
    useEffect(() => {
        // Retrieve all params from the URL such as q=apple
        const params = new URLSearchParams(location.search);
        const query = params.get('q')
        setSearchQuery(query);
        
        axios.get(`http://localhost:5000/api/light-novels/search/${query}`)
            .then(function (response) {
                setSearchResults(response.data.data);
                console.log(response.data.data);
            });
    }, [location]);

    return (
        <div>
            <p style={{fontSize: '36px', textAlign: 'center'}}>Search for: <b><em>{searchQuery}</em></b></p> 
            <NovelResults results={searchResults} viewIndex={viewIndex} />
            <ViewToggle setViewIndex={setViewIndex} />
        </div>
    )
}

export default SearchPage