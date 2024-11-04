import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ScrollButton from './ScrollButton';
import UpdateModal from './UpdateModal';
function Account() {

    const [userMangaList, setUserMangaList] = useState([]);
    const [userAnimeList, setUserAnimeList] = useState([]);
    const [userName, setUserName] = useState('');

    const [hasRetrieveManga, setHasRetrieveManga] = useState(false);
    const [hasRetrieveAnime, setHasRetrieveAnime] = useState(false);
    const [focus, setFocus] = useState([]);


    useEffect(() => {
        const now = new Date().getTime();
        const timeStamp = localStorage.getItem('loginTime');
        if (timeStamp === null || now - timeStamp > (60 * 60 * 1000)) {
            localStorage.setItem('loginTime', now);
            window.location.href = `${process.env.REACT_APP_BACKEND_API}/login`;
        } else {
            retrieveAccountInfo();
        }
    });

    const retrieveAccountInfo = async () => {
        await axios.get(`${process.env.REACT_APP_BACKEND_API}/account/info`, { withCredentials: true })
            .then(response => {
                // User not signed in 
                console.log(response.data);
                setUserName(response.data.name);
                if (response.data.login === false) {
                    window.location.href = response.data.redirect;
                } else {
                    console.log("SIGNED IN " + response.data.login);
                    const timeStamp = new Date().getTime();
                    localStorage.setItem('loginTime', timeStamp);
                }
            }).catch(error => {
                console.error('error: ' + error);
            })
    }

    const retrieveUserMangaList = async () => {
        if (!hasRetrieveManga) {
            await axios.get(`${process.env.REACT_APP_BACKEND_API}/account/mangalist`,
                { withCredentials: true })
                .then(response => {
                    setUserMangaList(response.data.data);
                    setHasRetrieveManga(true);
                    setFocus(['manga', response.data.data]);
                }).catch(error => {
                    console.log("Error: " + error);
                });
        } else {
            setFocus(['manga', userMangaList]);
            
        }
    }

    const retrieveUserAnimeList = async () => {
        if (!hasRetrieveAnime) {
            await axios.get(`${process.env.REACT_APP_BACKEND_API}/account/animelist`,
                { withCredentials: true })
                .then(response => {
                    console.log(response.data);
                    setUserAnimeList(response.data.data);
                    setHasRetrieveAnime(true);
                    setFocus(['anime', response.data.data]);

                }).catch(error => {
                    console.log("Error: " + error);
                });
        } else {
            setFocus(['anime', userAnimeList]);
        }
    }

    const refreshPage = (type) => {
        type === "anime" ? setHasRetrieveAnime(false) : setHasRetrieveManga(false);
    }

  return (
      <div>
          
          <h1>Welcome {userName.length > 0 ? userName : 'User'}! </h1>
          <br />
        <button onClick={retrieveUserAnimeList}>Get Anime List</button>
        <button onClick={retrieveUserMangaList}>Get Manga List</button>
        <div className="light-novels">
                
              {focus.length > 0 && (
                  <>
                      <h1 id={focus[0]}>{(focus[0].charAt(0).toUpperCase() + focus[0].slice(1))} List</h1>
                      <ul className={'container compact-view'}>
                          {
                              focus[1].map(node => (
                                  <li id={node.node.id}>
                                      <div id={node.node.id}>
                                          <div className='novel-picture'>
                                              <img src={node.node.main_picture.medium} alt="picture_holder" />
                                          </div>
                                          <h3 className='title'>
                                              <a href={`https://myanimelist.net/${focus[0]}/${node.node.id}`}>{node.node.title}</a>
                                          </h3>
                                      </div>
                                      <UpdateModal
                                          currentTitle={node.node.title}
                                          nodeID={node.node.id}
                                          type={focus[0]}
                                          mangaChange={setHasRetrieveManga}
                                          animeChange={setHasRetrieveAnime}
                                          retrieveManga={retrieveUserMangaList}
                                          retrieveAnime={retrieveUserAnimeList}
                                          refreshPage={refreshPage}
                                      />

                                  </li>
                              ))
                          }
                      </ul>
                  </>
              )}
              <ScrollButton />
        </div>
    </div>
  )
}

export default Account