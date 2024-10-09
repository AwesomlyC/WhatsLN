import React, { useEffect, useState } from 'react';
import {useSearchParams} from 'react-router-dom'
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/light-novels'

function SingleLightNovel() {

    const [singleLightNovel, setSingleLightNovel] = useState([]);
    const [recommendations, setRecommendation] = useState([]);

    const [loading, setLoading] = useState(true);
    const [retrieveRecommendation, setRetrieval] = useState(true);
    const [searchParams] = useSearchParams();
    let id = searchParams.get('id');
    
    useEffect(() => {
        const fetchSingleLightNovel = async () => {
            const response = await
                axios
                    .get(API_URL + `/${id}`)
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

        const fetchRecommendation = async () => {
            const response = await
                axios
                    .get(API_URL + `/recommendation/${id}`)
                    .then(function (response) {
                        setRetrieval(false);
                        setRecommendation(response.data.data);
                    }).catch(error => {
                        console.log("Error with recommendation single LN: " + error);
                    });
        }
            fetchSingleLightNovel();
            fetchRecommendation();
    }, []);

    if (loading || retrieveRecommendation) {
        console.log(loading + " " + retrieveRecommendation);
        return <div><h1>Loading...</h1></div>;
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
          Recommendation Area
          {recommendations.map(novel => (
                    <li key={novel.entry.mal_id}>
                    <h3>
                        <a href={`http://localhost:3000/single-ln?id=${novel.entry.mal_id}`}>{novel.entry.title}</a>
                    </h3>
                    <p>ID: {novel.entry.mal_id}</p>
                    {/* // May need to modified the image_url later */}
                  <img src={novel.entry.images.jpg.image_url} alt={novel.entry.images.webp.image_url} />    
                </li>
              ))}

      </div>
  )
}

export default SingleLightNovel