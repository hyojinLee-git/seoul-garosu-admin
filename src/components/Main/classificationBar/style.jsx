import styled from "styled-components";

export const ClassificationButton=styled.button`
    border:none;
    outline: none;
    cursor: pointer;
    background: none;
    width:180px;
    height: 46px;
    text-align: start;
    display: inline-flex;
    align-items: center;
    &.active{
        color:${props=>props.color};
        border-bottom: 3px solid ${props=>props.color};
    }
    

`