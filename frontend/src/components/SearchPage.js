import React, { useEffect, useState }  from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios';
function SearchPage() {

    const location = useLocation();
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
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
            <div className="light-novels">
                <ul>
                    {searchResults.map(novel => (
                        <li key={novel.mal_id}>
                            <div className="novel">
                                <img src={novel.images.jpg.image_url} alt="picture_holder" />
                                <div className='description'>
                                    <h3 className="title">
                                        <a href={`http://localhost:3000/single-ln?id=${novel.mal_id}`}>{novel.title}</a>
                                    </h3>
                                    <h5 className="title"><a href={`${novel.url}`}>Link to MyAnimeList's Page</a></h5>

                                    <div className="novel-synopsis">
                                        <h2><em>Synopsis:</em></h2> {novel.synopsis ? novel.synopsis : "No synopsis information has been found..."}
                                    </div>
                                    <div className='genres'>
                                        <b>Genres: </b>{novel.genres.length > 0 ? novel.genres.map(item => item.name).join(', ') : "N/A"}
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default SearchPage