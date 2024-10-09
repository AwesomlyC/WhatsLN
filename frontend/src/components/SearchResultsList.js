import React from 'react'
import './../styles/SearchResultsList.css'
import SearchResult from './SearchResult';
function SearchResultsList({ results }) {
    // console.log("Results: " + results + "----" + results.map((result, id) => console.log(result.name)));
  return (
      <div className='results-list'>
          {results.map((result, id) => {
              console.log(result);
              return <div><SearchResult result={result} key={id} /></div>
          })}

    </div>
  )
}

export default SearchResultsList