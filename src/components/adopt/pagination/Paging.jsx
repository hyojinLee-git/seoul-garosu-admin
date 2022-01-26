import React, { useState } from 'react';
import {MdChevronLeft,MdChevronRight,MdFirstPage,MdLastPage} from 'react-icons/md'
import { useRecoilState } from 'recoil';
import {PaginationDiv} from './style'
import {fetchDataState} from '../../../state/fetchDataState'
import Pagination from 'react-js-pagination'
import {Link, useParams} from 'react-router-dom'

const Paging = () => {
    const [dataList]=useRecoilState(fetchDataState)
    const params=useParams()
    console.log(params)
    
    //11개 or 10개 단위
    //const pageList=[1,2,3,4,5,6,7,8,9,10]
    const [activePage,setActivePage]=useState(1)
    const getPageList=()=>{
        const pageList=[1]
        const lastPage=Math.ceil(dataList.length/10)
        for (let i=2;i<=lastPage;i++){
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
                <Link key={item} to={`/adopt/${params.subMenu}/${item}`}>{item}</Link>
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