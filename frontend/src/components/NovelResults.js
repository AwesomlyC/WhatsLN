import React from 'react'
import './../styles/NovelResults.css'
function NovelResults({results, viewIndex}) {
    const views = ['detailed', 'grid', 'compact'];

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
    return (
        <div className="light-novels">
            <ul className={`container ${views[viewIndex]}-view`}>
                {results.map(novel => (
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
    )
}

export default NovelResults