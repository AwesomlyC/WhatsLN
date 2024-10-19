import React from 'react'
import "./../styles/Pagination.css"
function Pagination({ pagination }) {
    // Want to show 1 2 3 4 5 ... last_page 
    //                  _
    let current_page = pagination.current_page;
    let last_visible_page = pagination.last_visible_page;
    const WEBPAGE_URL = "http://localhost:3000/?page="
    console.log(pagination);
  return (
    <div className='pagination'>
      <div className='pagination-left'>
        {(current_page - 1) >= 1 && <div><a href={`${WEBPAGE_URL}${current_page - 1}`}>Previous</a></div>}
      </div>
      <div className='pagination-center'>
        {(current_page - 1) >= 3 && <div><a href={`${WEBPAGE_URL}${1}`}>{1}</a></div>}
        {(current_page - 1) >= 3 && <div>...</div>}

        {(current_page - 1) >= 2 && <div><a href={`${WEBPAGE_URL}${current_page - 2}`}>{current_page - 2}</a></div>}

        {(current_page - 1) >= 1 && <div><a href={`${WEBPAGE_URL}${current_page - 1}`}>{current_page - 1}</a></div>}

        <b>{pagination.current_page}</b>

        {(last_visible_page - current_page) >= 1 && <div><a href={`${WEBPAGE_URL}${current_page + 1}`}>{current_page + 1}</a></div>}

        {(last_visible_page - current_page) >= 2 && <div><a href={`${WEBPAGE_URL}${current_page + 2}`}>{current_page + 2}</a></div>}

        {(last_visible_page - current_page) >= 3 && <div>...</div>}

        {(last_visible_page - current_page) >= 3 && <div><a href={`${WEBPAGE_URL}${last_visible_page}`}>{last_visible_page}</a></div>}
      </div>
      <div className='pagination-right'>
        {(last_visible_page - current_page) >= 1 && <div><a href={`${WEBPAGE_URL}${current_page + 1}`}>Next</a></div>}
      </div>
    </div>
  )
}

export default Pagination