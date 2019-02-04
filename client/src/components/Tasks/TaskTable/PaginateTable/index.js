import React from 'react';

import './style.css'

const Pagination = ({ fetchData, page, pages }) => (
  <div className="pagination ">
    <div className="previous">
      <button 
        onClick={() => fetchData('prev')} 
        disabled={page <= 1}>
        Previous
      </button>
    </div>
    <div className="center">
      <p>Page {page} of {pages}</p>
    </div>
    <div className="next">
      <button 
        onClick={() => fetchData('next')} 
        disabled={page === pages}>
        Next
      </button>
    </div>
  </div>
)

export default Pagination;