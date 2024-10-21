import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import { useNavigate, useSearchParams } from 'react-router-dom'; 
import Pagination from './Pagination';
import './../styles/LightNovels.css'
const SERVER_URL = `http://localhost:5000/api/light-novels`

function LightNovels() {

    const [lightNovel, setLightNovel] = useState([]);
    const [pagination, setPagination] = useState([]);
    const [currentPage, setCurrentPage] = useSearchParams();
    
    const views = ['detailed', 'grid', 'compact'];
    const [viewIndex, setViewIndex] = useState(0);

    const page = currentPage.get('page') ? currentPage.get('page')  : 1;
    const navigate = useNavigate();
    useEffect(() => {
        const fetchLightNovels = async () => {
            // Calls backend API to retrieve all light novels
            const response = await axios.get(SERVER_URL + "?page=" + page)
                .then(function (response) {
                    setLightNovel(response.data.data);
                    setPagination(response.data.pagination)
                })
                .catch(error => {
                    console.log("Error with fetching light novels using backend API: " + error);
                });
        };
        const saved = localStorage.getItem("viewIndex");
        if (saved) {
            setViewIndex(saved);
        }
        fetchLightNovels();
    }, []);


    const fetchRandomManga = () => {
        // API CALL
        axios
            .get(SERVER_URL + "/random/manga")
            .then(function (response) {
                navigate(response.data);
            })
                .catch(error => {
                    console.log("Error with fetching random manga...");
                })
        
    }

    const fetchRandomAnime = () => {
        // API CALL
        axios
        .get(SERVER_URL + "/random/anime")
            .then(function (response) {
                navigate(response.data);
        })
            .catch(error => {
                console.log("Error with fetching random manga...");
            })
    }
    function truncateSynopsis(synopsis) {
        if (synopsis) {
            if (views[viewIndex] === 'detailed') {
                return synopsis;
            }
            if (synopsis.length > 100) {
                return synopsis.slice(0, 300) + "..."
            }
            return synopsis;
        } else {
            return "No synopsis information has been found..."
        }
    }

    const toggleView = () => {
        setViewIndex((prevIndex) => {
            const newIndex = (prevIndex + 1) % views.length; 
            localStorage.setItem('viewIndex', newIndex);
            return newIndex
        });
    }

    
    return (
        <div>
            <div className='header'>
                <button className='fetch-random' onClick={fetchRandomManga}>Random Manga</button>
                <h1> Home Page</h1>
                <button className='fetch-random' onClick={fetchRandomAnime}>Random Anime</button>
                <button onClick={toggleView}>
                    Toggle View: {`${views[viewIndex]}`}
                  </button>
            </div>
            <div className="light-novels">
                <ul className={`container ${views[viewIndex]}-view`}>
                    {lightNovel.map(novel => (
                        <li>
                            {views[viewIndex] === "compact" ?
                                <div className="compact-view">
                                    <div className='novel-picture'>
                                        <img src={novel.images.jpg.image_url} alt="picture_holder" />
                                    </div>
                                    <div className='small-description'>
                                        <h3 className="title">
                                            <a href={`http://localhost:3000/single-ln?id=${novel.mal_id}`}>{novel.title}</a>
                                        </h3>
                                        <h5 className="title"><a href={`${novel.url}`}>Link to MyAnimeList's Page</a></h5>
                                    </div>
                                </div>
                                :
                                <div className="novel">
                                    <div className='novel-picture'>
                                        <img src={novel.images.jpg.image_url} alt="picture_holder" />
                                    </div>
                                    <div className='description'>
                                        <h3 className="title">
                                            <a href={`http://localhost:3000/single-ln?id=${novel.mal_id}`}>{novel.title}</a>
                                        </h3>
                                        <h5 className="title"><a href={`${novel.url}`}>Link to MyAnimeList's Page</a></h5>

                                        <div className="novel-synopsis">
                                            <h2><em>Synopsis:</em></h2>
                                            {truncateSynopsis(novel.synopsis)}
                                        </div>
                                        <div className='genres'>
                                            <b>Genres: </b>{novel.genres.length > 0 ? novel.genres.map(item => item.name).join(', ') : "N/A"}
                                        </div>
                                        <div className='author'>
                                            <b>Author(s): </b> {novel.authors.length > 0 ? novel.authors.map(author => author.name).join(', ') : "N/A"}
                                        </div>
                                        <div className='status'>
                                            <b>Status: </b> {novel.status}
                                        </div>
                                        <div className='type'>
                                            <b>Type: </b> {novel.type}
                                        </div>
                                        <div className='score'>
                                            <b>Score: </b> {novel.score !== null ? novel.score : "N/A"}
                                        </div>
                                    </div>
                                </div>
                            }
                        </li>
                    ))}
                </ul>
            </div>
            <Pagination pagination={pagination} />
        </div>
    )
}

export default LightNovels