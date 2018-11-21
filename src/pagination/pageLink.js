
import * as React from 'react';

let PageLink = (props) => {

    let handlePaginationChange = (event) => {
        props.handlePaginationChange('TO_PAGE_NUMBER', event);
    }

    return (
        <li className="page-item"
            onClick={handlePaginationChange}>
            <button type="button" value={props.index}
                className={"page-link " + (props.activePage === props.index ? "active" : "")}>{props.index}
            </button>
        </li>
    );
}

export default PageLink;