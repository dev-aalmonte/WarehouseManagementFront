import React, { Component } from 'react';

import { FormSmallButton } from '../formFields';

class Pagination extends Component {

    paginationOnClick(url, fetch) {
        if (url != null){
            fetch(url);
        }
    }

    render() {
        const { className, pagination, fetch } = this.props;
        return (
            <div className={`${className} pagination`}>
                <div className='pagination__pagination-info'>
                    Page: {pagination.current_page} of {pagination.last_page}
                </div>
                <div className='pagination__pagination-buttons'>
                    <FormSmallButton onClick={() => this.paginationOnClick(pagination.prev_page_url, fetch)} className={`pagination__pagination-buttons__button prev ${pagination.prev_page_url == null ? 'hidden' : '' }`} type='button' icon='angle-left'/>
                    <FormSmallButton onClick={() => this.paginationOnClick(pagination.next_page_url, fetch)} className={`pagination__pagination-buttons__button next ${pagination.next_page_url == null ? 'hidden' : '' }`} type='button' icon='angle-right'/>
                </div>
            </div>
        )
    }
}

export default Pagination;