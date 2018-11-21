
import * as React from 'react';
import './pagination.css';
import PageLink from './pageLink';

class PaginationComponent extends React.Component {
    constructor() {
        super();
        this.handlePaginationChange = this.handlePaginationChange.bind(this);
    }
    render() {
        const rows = [];
        const pgNum = [];
        let showPagination = true;

        for (var i = 1; i <= (Math.ceil(this.props.itemCount / this.props.itemPerPage)); i++) {
            if (i >= (this.props.activePage - 4) && i <= (this.props.activePage + 4)) {
                pgNum.push(
                    <PageLink
                        activePage={this.props.activePage}
                        handlePaginationChange={this.handlePaginationChange}
                        index={i}
                        key={i} />
                );
            }
            rows.push(
                <PageLink
                    activePage={this.props.activePage}
                    handlePaginationChange={this.handlePaginationChange}
                    index={i}
                    key={i} />
            );
        }

        if (this.props.itemCount < this.props.itemPerPage) {
            showPagination = false;
        }

        // const pgNum = rows.slice(this.props.activePage,9);

        return (
            <nav aria-label="Page navigation">
                <ul hidden={!showPagination} className='pagination  pagination-sm'>
                    {pgNum}
                </ul>
            </nav >
        );
    }

    handlePaginationChange(action, event) {
        if (action === 'TO_PAGE_NUMBER') {
            this.props.pageChange(parseInt(event.target.value, 10));
        }
    }

}

export default PaginationComponent;