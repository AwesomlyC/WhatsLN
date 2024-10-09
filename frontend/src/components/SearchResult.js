import React from 'react'
import "./../styles/SearchResult.css"

function SearchResult({ result } ) {
  return (
    <div className='search-result' onClick={(e) => alert(result.mal_id)}>{result.name} </div>
  )
}

export default SearchResult