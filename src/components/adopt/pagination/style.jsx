import styled from "styled-components";

export const PaginationDiv=styled.div`
    position: absolute;
    bottom: 0;
    width: 98%;
    height: 8vh;
    display: flex;
    align-items: center;
    justify-content: center;
    .pagination{ 
        display: flex; 
        justify-content: center; 
        margin-top: 15px; 

    } 
    & ul { 
        list-style: none; 
        padding: 0; 
    } 
    & ul.pagination li { 
        display: inline-block; 
        width: 21px; 
        height: 21px; 
        display: flex; 
        justify-content: center; 
        align-items: center; 
        box-sizing: border-box;
    } 

    & ul.pagination li a { 
        text-decoration: none; 
        color:black;
        font-size: 12px; 
    } 
    & ul.pagination li.active a { 
        color: #44AB9A; 
    } 
    & ul.pagination li.active { 
        border:1px solid #EDEAE9;
        box-sizing: border-box;
    } 
    & ul.pagination li a:hover, ul.pagination li a.active { 
        color: #44AB9A; 
    } 
    .page-selection { 
        width: 48px; 
        height: 30px; 
        color: #44AB9A; 
    }


    
`
