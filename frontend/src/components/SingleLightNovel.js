import React, { useEffect, useState } from 'react';
import {useSearchParams} from 'react-router-dom'
import axios from 'axios';
import './../styles/SingleLightNovel.css'

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
          <div className="description-area">
              <div className="title">
                  <h3>Title: {singleLightNovel.title}</h3>
                  <h4>Alt. Title: {singleLightNovel.title_japanese}</h4>
                  <h5><a href = {`${singleLightNovel.url}`}>Link to MyAnimeList's Page</a></h5>
              </div>
              <div className="details">
              <div className="image">
                <img src={singleLightNovel.images.jpg.image_url} alt={singleLightNovel.images.webp.image_url} />    
                  </div>
                  <div className="synopsis">
                      <h2><em>Synopsis:</em></h2> {singleLightNovel.synopsis}
                  </div>
                </div>
          </div>
          <div className="recommendation-area">
              <div className="title" id="recommendation"><h1>Recommendations</h1></div>
              <div className="recommendations">
                  {recommendations.map(novel => (
                      <li key={novel.entry.mal_id}>
                          <img src={novel.entry.images.jpg.image_url} alt={novel.entry.images.webp.image_url} />
                          <h3>
                              <a href={`http://localhost:3000/single-ln?id=${novel.entry.mal_id}`}>{novel.entry.title}</a>
                          </h3>
                      </li>
                  ))}
              </div>

          </div>
      </div>
  )
}

export default SingleLightNovel