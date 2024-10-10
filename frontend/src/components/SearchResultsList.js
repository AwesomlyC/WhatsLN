import React from 'react'
import './../styles/SearchResultsList.css'
import SearchResult from './SearchResult';
function SearchResultsList({ results }) {
  return (
    <div className='results-list' key={results}>
      {results.map((result) => {
              return <div><SearchResult key={result.mal_id} result={result} /></div>
          })}
    </div>
  )
}

export default SearchResultsList