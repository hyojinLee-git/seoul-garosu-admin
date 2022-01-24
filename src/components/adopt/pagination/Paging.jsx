import React, { useState } from 'react';
import {MdChevronLeft,MdChevronRight,MdFirstPage,MdLastPage} from 'react-icons/md'
import { useRecoilState } from 'recoil';
import {PaginationDiv} from './style'
import {fetchDataState} from '../../../state/fetchDataState'
import Pagination from 'react-js-pagination'

const Paging = () => {
    const [dataList]=useRecoilState(fetchDataState)
    //11개 or 10개 단위
    //모니터 크기 커지면 더 늘어날텐데..
    //const pageList=[1,2,3,4,5,6,7,8,9,10]
    const [activePage,setActivePage]=useState(1)
    const getPageList=()=>{
        const pageList=[]
        const lastPage=Math.ceil(dataList.length/10)
        for (let i=1;i<=lastPage;i++){
            pageList.push(i)
        }
        return pageList
    }
    const pageList=getPageList()
    const onChangePage=(page)=>{
        setActivePage(page)
    }
    return (
        <PaginationDiv>
            <button>
                <MdFirstPage size={24} color='rgba(0, 0, 0, 0.54)'/>
            </button>
            <button>
                <MdChevronLeft size={24} color='rgba(0, 0, 0, 0.54)'/>
            </button>
            {pageList.map((item)=>(
                <button key={item}>{item}</button>
            ))}
            <button>
                <MdChevronRight size={24} color='rgba(0, 0, 0, 0.54)'/>
            </button>
            <button>
                <MdLastPage size={24} color='rgba(0, 0, 0, 0.54)'/>
            </button>
            {/* <Pagination
                activePage={activePage}
                itemsCountPerPage={11}
                totalItemsCount={dataList.length}
                pageRangeDisplayed={10}
                prevPageText={<MdChevronLeft/>}
                nextPageText={<MdChevronRight/>}
                onChange={onChangePage}
            /> */}
        </PaginationDiv>
    );
};

export default Paging;