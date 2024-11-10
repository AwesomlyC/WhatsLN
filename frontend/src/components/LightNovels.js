import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import { useNavigate, useSearchParams } from 'react-router-dom'; 
import Pagination from './Pagination';
import NovelResults from './NovelResults';
import ViewToggle from './ViewToggle';
import './../styles/LightNovels.css'


const SERVER_URL = `http://localhost:5000/api/light-novels`

function LightNovels() {

    const [lightNovel, setLightNovel] = useState([]);
    const [pagination, setPagination] = useState([]);
    const [currentPage, setCurrentPage] = useSearchParams();
    
    const [viewIndex, setViewIndex] = useState(0);
    
    const [selectedSearch, setSelectedSearch] = useState('lightnovel');

    const page = currentPage.get('page') ? currentPage.get('page') : 1;
    const navigate = useNavigate();
    useEffect(() => {
        const fetchLightNovels = async () => {
            // Calls backend API to retrieve all light novels
            const response = await axios.get(SERVER_URL + "?page=" + page + "&type=" + selectedSearch)
                .then(function (response) {
                    console.log(response.data);
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
    }, [selectedSearch]);


    const fetchRandomManga = () => {
        // API CALL
        axios
            .get(SERVER_URL + "/random/manga")
            .then(function (response) {
                navigate(response.data);
            })
            .catch(error => {
                console.log("Error with fetching random manga...");
            });
        
    }

    const fetchRandomAnime = () => {
        // API CALL

        // NEEDS TO UPDATE
        // axios
        //     .get(SERVER_URL + "/random/anime")
        //     .then(function (response) {
        //         navigate(response.data);
        //     })
        //     .catch(error => {
        //         console.log("Error with fetching random manga...");
        //     });
    }

    const changeSelection = (value) => {
        setSelectedSearch(value);
    }

    return (
        <div>
            <div className='header'>
                <div className='radio'>
                    
                    <label>
                        Light Novel
                        <input
                            type='radio'
                            value='lightnovel'
                            checked={selectedSearch === 'lightnovel'}
                            onChange={(e) => changeSelection(e.target.value)}
                             />
                    </label>
                    <label>
                        Manga
                        <input
                            type='radio'
                            value='manga'
                            checked={selectedSearch === 'manga'}
                            onChange={(e) => changeSelection(e.target.value)}
                        />
                    </label>
                    <label>
                        Anime
                        <input
                            type='radio'
                            value='anime'
                            checked={selectedSearch === 'anime'}
                            onChange={(e) => changeSelection(e.target.value)}
                        />
                    </label>
                    
                </div>
                <button className='fetch-random' onClick={fetchRandomManga}>Random Manga</button>
                <h1> Home Page</h1>
                <button className='fetch-random' onClick={fetchRandomAnime}>Random Anime</button>
            </div>
            
            <div className='main-results'>
                <ViewToggle setViewIndex={setViewIndex} />
                <NovelResults results={lightNovel} viewIndex={viewIndex} />
            </div>
            <Pagination pagination={pagination} />
        </div>
    )
}

export default LightNovels