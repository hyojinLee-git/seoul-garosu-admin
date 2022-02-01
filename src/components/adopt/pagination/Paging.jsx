import React from 'react';
import {MdChevronLeft,MdChevronRight,MdFirstPage,MdLastPage} from 'react-icons/md'
import { useRecoilState } from 'recoil';
import {PaginationDiv} from './style'
import {fetchDataState} from '../../../state/fetchDataState'
import Pagination from 'react-js-pagination'
import { currentPageState } from '../../../state/currentPageState';

const Paging = () => {
    const [dataList]=useRecoilState(fetchDataState)
    const [currentPage,setCurrentPage]=useRecoilState(currentPageState)

    const onChangePage=(page)=>{
        setCurrentPage(page)
    }
    return (
        <PaginationDiv>
            <Pagination
                activePage={currentPage}
                itemsCountPerPage={10}
                totalItemsCount={dataList.length}
                pageRangeDisplayed={10}
                firstPageText={<MdFirstPage/>}
                prevPageText={<MdChevronLeft/>}
                nextPageText={<MdChevronRight/>}
                lastPageText={<MdLastPage/>}
                onChange={onChangePage}
            />
        </PaginationDiv>
    );
};

export default Paging;