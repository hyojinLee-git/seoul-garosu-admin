import React from 'react';
import {MdChevronLeft,MdChevronRight,MdFirstPage,MdLastPage} from 'react-icons/md'
import { useRecoilState } from 'recoil';
import {PaginationDiv} from './style'
import Pagination from 'react-js-pagination'
import { currentPageState } from '../../../state/currentPageState';

const Paging = ({totalItemsCount,itemsCountPerPage,pageRangeDisplayed,}) => {
    const [currentPage,setCurrentPage]=useRecoilState(currentPageState)
    const onChangePage=(page)=>{
        setCurrentPage(page)
    }
    return (
        <PaginationDiv>
            <Pagination
                activePage={currentPage}
                itemsCountPerPage={itemsCountPerPage}
                totalItemsCount={totalItemsCount}
                pageRangeDisplayed={pageRangeDisplayed}
                firstPageText={<MdFirstPage/>}
                prevPageText={<MdChevronLeft/>}
                nextPageText={<MdChevronRight/>}
                lastPageText={<MdLastPage/>}
                onChange={onChangePage}
            />
        </PaginationDiv>
    );
};

export default React.memo(Paging);