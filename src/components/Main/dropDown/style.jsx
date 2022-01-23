import styled from "styled-components";

export const DropDownDiv=styled.div`
    position: absolute;
    width: 130px;
    background: rgb(255, 255, 255);
    left:30px;
    border:1px solid red;

`
export const DropDownUl=styled.ul`
    list-style: none;
    padding: 10px;
    margin:0;

`
export const DropDownLi=styled.li`
    &:hover{
        background: #6AD39F;
    }
`
export const DropDownMenuButton=styled.button`
    background: none;
    border:none;
    outline: none;
    cursor: pointer;
`