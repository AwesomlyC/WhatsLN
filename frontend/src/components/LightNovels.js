import React, { useEffect, useState } from 'react';
import axios from 'axios';

function LightNovels() {

    const [lightNovel, setLightNovel] = useState([]);
    useEffect(() => {
        const fetchLightNovels = async () => {
            // Calls backend API to retrieve all light novels
            const response = await axios.get('http://localhost:5000/api/light-novels')
                .then(function (response) {
                    setLightNovel(response.data.data);
                    console.log("LightNovels Response: " + lightNovel);
                })
                .catch(error => {
                    console.log("Error with fetching light novels using backend API: " + error);
                });
            console.log("Response from API: " + response);

        };

        fetchLightNovels();
    }, []);



    
    return (
        <div>
            <h2> Available Light Novels</h2>
            <ul>
                {lightNovel.map(novel => (
                    <li key={novel.mal_id}>
                        <h3>
                            <a href={`http://localhost:3000/single-ln?id=${novel.mal_id}`}>{novel.title}</a>
                        </h3>
                        <p>ID: {novel.mal_id}</p>
                        {/* // May need to modified the image_url later */}
                        <img src = {novel.images.jpg.image_url} alt = "picture_holder"/>    
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default LightNovels