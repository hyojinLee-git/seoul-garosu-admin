import styled from "styled-components";

export const EducationContainer=styled.div`
    width: 80vw;
    height: 90vh;
    /* border:3px solid blue; */
    box-sizing: border-box;
    padding: 0 10px;
    position: relative;
`
export const ControlBar=styled.div`
    /* border:1px solid red; */
    display: flex;
    justify-content: space-between;
`
export const Button=styled.button`
    background: ${props=>props.bgColor};
    color:${props=>props.color};
    border:none;
    border-bottom: ${props=>props.border||'none'};
    outline: none;
    cursor: pointer;
    height: 50px;
    font-size: 20px;
    width:180px;
    border-radius: ${props=>props.borderRadius};
    margin-right: 10px;
    &.active{
        color:#669AFF
    }
    
`
