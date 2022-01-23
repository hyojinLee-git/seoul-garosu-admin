import React from 'react';
// import firstPage from '../../assets/Main/Paginaton/first-page.png'
// import lastPage from '../../assets/Main/Paginaton/last-page.png'
// import chevronLeft from '../../assets/Main/Paginaton/chevron-left.png'
// import chevronRight from '../../assets/Main/Paginaton/chevron-right.png'
import {PaginationDiv} from './style'
const Pagination = () => {
    const pageList=[1,2,3,4,5,6,7,8,9,10]
    return (
        <PaginationDiv>
            <button>{"|<"}</button>
            <button>{"<"}</button>
            {pageList.map((item)=>(
                <button key={item}>{item}</button>
            ))}
            <button>{">"}</button>
            <button>{">|"}</button>
        </PaginationDiv>
    );
};

export default Pagination;