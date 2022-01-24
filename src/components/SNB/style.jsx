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
        display:inline-flex;
        background:none;
        color:black;
        border:none;
        outline: none;
        text-decoration: none;
        align-items: center;
        height: 50px;
        cursor: pointer;
    }
    & span{
        margin-left: 5px;
    }
`