import React from 'react';

const Pagination = (props) => {
    const listItems = props.paginationList.map((character, index) =>
        <li 
            className="page-item" 
            key={index}
            active={props.selectedPaginationChar === character && true}
        >
            <a class="page-link" href="#">{character}</a>
        </li>
    );
    return (
      <ul className="pagination table-responsive mb-2">{listItems}</ul>
    );
  }

  export default Pagination;