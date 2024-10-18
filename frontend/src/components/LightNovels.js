import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom'; 
import './../styles/LightNovels.css'
function LightNovels() {

    const [lightNovel, setLightNovel] = useState([]);
    const navigate = useNavigate();
    const SERVER_URL = `http://localhost:5000/api/light-novels`
    useEffect(() => {
        const fetchLightNovels = async () => {
            // Calls backend API to retrieve all light novels
            const response = await axios.get(SERVER_URL)
                .then(function (response) {
                    setLightNovel(response.data.data);
                })
                .catch(error => {
                    console.log("Error with fetching light novels using backend API: " + error);
                });
        };

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
    
    return (
        <div>
            <div className='header'>
                <button className='fetch-random' onClick={fetchRandomManga}>Random Manga</button>
                <h1> Home Page</h1>
                <button className='fetch-random' onClick={fetchRandomAnime}>Random Anime</button>

            </div>
            <div className="light-novels">
                <ul>
                    {lightNovel.map(novel => (
                        <li>
                            <div className="novel">
                                <img src={novel.images.jpg.image_url} alt="picture_holder" />
                                <div className='description'>
                                    <h3 className="title">
                                        <a href={`http://localhost:3000/single-ln?id=${novel.mal_id}`}>{novel.title}</a>
                                    </h3>
                                    <h5 className="title"><a href = {`${novel.url}`}>Link to MyAnimeList's Page</a></h5>

                                    <div className="novel-synopsis">
                                        <h2><em>Synopsis:</em></h2> {novel.synopsis ? novel.synopsis: "No synopsis information has been found..."}
                                    </div>
                                    <div className='genres'>
                                        <b>Genres: </b>{novel.genres.length > 0 ? novel.genres.map(item => item.name).join(', '): "N/A"}
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
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default LightNovels