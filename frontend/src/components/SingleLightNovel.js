import React, { useEffect, useState } from 'react';
import {useSearchParams} from 'react-router-dom'
import axios from 'axios';


function SingleLightNovel() {

    const [singleLightNovel, setSingleLightNovel] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();
    let id = searchParams.get('id');
    
    useEffect(() => {
        const fetchSingleLightNovel = async () => {
            const response = await
                axios
                    .get(`http://localhost:5000/api/light-novels/${id}`)
                    .then(function (response) {
                        setSingleLightNovel(response.data.data);
                        console.log(singleLightNovel);
                        setLoading(false);
                    })
                    .catch(error => {
                        console.log("Error with Single Light Novel: " + error);
                    });
            console.log("--==Returning from fetchSingleLightNovel==--");
        }

        fetchSingleLightNovel();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }
  return (
      <div className="container">
          <ul>
            <li key={singleLightNovel.mal_id}>
                <h3>{singleLightNovel.title}</h3>
                  <p>ID: {singleLightNovel.mal_id}</p>
                  <a href = {`${singleLightNovel.url}`}>Link to MAL</a>
                  <img src={singleLightNovel.images.jpg.image_url} alt={singleLightNovel.images.webp.image_url} />    
            </li> 
          </ul>
      </div>
  )
}

export default SingleLightNovel