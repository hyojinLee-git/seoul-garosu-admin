import styled from "styled-components"

export const AdmissionBarDiv=styled.div`
    display: flex;
    margin-top: 36px;
    /* border:1px solid red; */
    align-items:center;
    padding:5px 10px;
    box-sizing: border-box;
    &>*:nth-child(1){flex:0.8}
    &>*:nth-child(2){flex:8}
    &>*:nth-child(3){flex:1.5}
    
`

export const AdmissionBarButton=styled.button`
        height: 24px;
        outline: none;
        border:none;
        background: none;
`

export const ProcessButton=styled.button`
    background:${props=>props.color};
    width: 70px;
    height: 24px;
    border-radius: 5px;
    color:white;
    border:none;
    outline: none;
    cursor: pointer;
    margin-left:10px;


`