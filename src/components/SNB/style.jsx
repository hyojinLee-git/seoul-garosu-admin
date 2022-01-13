import styled from "styled-components";

export const SNB=styled.nav`
    height: 90vh;
    width: 20vw;
    padding: 30px;
    box-shadow:1px 0 0 0 #EDEAE9;
    box-sizing: border-box;
`
export const SideMenuUl=styled.ul`
    margin:0;
    padding: 0;
    list-style: none;
    & button{
        background: none;
        border:none;
        outline: none;
        cursor: pointer;
        width: 100%;
        text-align:start;
        height: 50px;
    }
    & img{
        vertical-align: bottom;
        margin-right: 8px;
        

    }
`