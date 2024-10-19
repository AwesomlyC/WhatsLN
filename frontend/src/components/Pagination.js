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
          Show First Page: {(current_page - 1) >= 3 && <div><a href={`${WEBPAGE_URL}${1}`}>{1}</a></div>}
          <br />
          ...
          <br/>
          Shows 2 page before: {(current_page - 1) >= 2 && <div><a href={`${WEBPAGE_URL}${current_page - 2}`}>{current_page - 2}</a></div>}
          <br />
          Shows 1 page before: {(current_page - 1) >= 1 && <div><a href={`${WEBPAGE_URL}${current_page - 1}`}>{current_page - 1}</a></div>}
          <br />
          Current_Page: {pagination.current_page}
            <br />
          Shows 1 page after: {(last_visible_page - current_page) >= 1 && <div><a href={`${WEBPAGE_URL}${current_page + 1}`}>{current_page + 1}</a></div>}
          <br />
          Shows 2 page after: {(last_visible_page - current_page) >= 2 && <div><a href={`${WEBPAGE_URL}${current_page + 2}`}>{current_page + 2}</a></div>}
          <br />
          ...

          <br />
          Show Last Page: {(last_visible_page - current_page) >= 3 && <div><a href={`${WEBPAGE_URL}${last_visible_page}`}>{last_visible_page}</a></div>}
        </div>
  )
}

export default Pagination