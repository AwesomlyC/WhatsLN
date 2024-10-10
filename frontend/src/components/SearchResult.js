import React from 'react'
import "./../styles/SearchResult.css"

function SearchResult({ result } ) {
  return (
    <a href={`http://localhost:3000/single-ln?id=${result.mal_id}`} className = 'search-result-link'>
      <div className='search-result' key={result.mal_id} style={{ cursor: 'pointer' }}>
        {result.title.length > 40 ? result.title.slice(0,40) + "..." : result.title}
      </div>
    </a>
  )
}

export default SearchResult