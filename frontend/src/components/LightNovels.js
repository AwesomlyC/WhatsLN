import React, { useEffect, useState } from 'react';
import axios from 'axios'; 

import './../styles/LightNovels.css'
function LightNovels() {

    const [lightNovel, setLightNovel] = useState([]);
    useEffect(() => {
        const fetchLightNovels = async () => {
            // Calls backend API to retrieve all light novels
            const response = await axios.get('http://localhost:5000/api/light-novels')
                .then(function (response) {
                    setLightNovel(response.data.data);
                    console.log(lightNovel);
                })
                .catch(error => {
                    console.log("Error with fetching light novels using backend API: " + error);
                });
            console.log(response);

        };

        fetchLightNovels();
    }, []);



    
    return (
        <div>
            <h1> Home Page</h1>
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