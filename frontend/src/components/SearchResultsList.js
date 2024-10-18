import React from 'react'
import './../styles/SearchResultsList.css'
import SearchResult from './SearchResult';
function SearchResultsList({ results, showResults }) {
  return (
    <div className='results-list' key={results}>
      
      {showResults && results.length > 0 && results.map((result) => {
              return <div><SearchResult key={result.mal_id} result={result} /></div>
          })}
    </div>
  )
}

export default SearchResultsList