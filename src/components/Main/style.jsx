import styled from "styled-components";

export const MainDiv=styled.div`
    width: 80vw;
    /* border:3px solid blue; */
    box-sizing: border-box;
    position: relative;
`

export const AdmissionBarDiv=styled.div`
    display: flex;
    margin-top: 36px;
    /* border:1px solid red; */
    align-items:center;
    padding:5px 10px;
    box-sizing: border-box;
    &>*:nth-child(1){flex:1}
    &>*:nth-child(2){flex:8}
    &>*:nth-child(3){flex:1.5}
    
    & button{
        height: 24px;
        outline: none;
        border:none;
        background: ${props=>props.color||"none"};
        
        
    }
`
export const ProcessButton=styled.button`
    background:${props=>props.color};
    width: 70px;
    height: 24px;
    border-radius: 5px;
    /* color:white; */
    border:none;
    outline: none;
    cursor: pointer;
    margin-left:10px;


`
export const CheckBox=styled.input`
    width: 18px;
    height: 18px;
`

export const ClassificationBarDiv=styled.div`
        
`
export const ClassificationButton=styled.button`
    border:none;
    outline: none;
    cursor: pointer;
    background: none;
    width:180px;
    height: 46px;
    text-align: start;
    &.active{
        color:${props=>props.color};
        border-bottom: 3px solid ${props=>props.color};
    }
    

`

export const ApplyListUl=styled.ul`
    margin:0;
    padding:0;
    list-style: none;
    width: 100%;
    &>li{
        border-bottom:1px solid #EDEAE9;
        display: flex;
        height: 40px;
        align-items: center;
        padding:0 5px;
        &>*:nth-child(1){flex:0.5};
        &>*:nth-child(2){flex:0.5};
        &>*:nth-child(3){flex:1};
        &>*:nth-child(4){flex:2};
        &>*:nth-child(5){flex:3};
        &>*:nth-child(6){flex:3};
        &>*:nth-child(7){flex:2};
    }
`
export const PaginationDiv=styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 8vh;
    display: flex;
    align-items: center;
    justify-content: center;
    & button{
        background: none;
        border:none;
        outline: none;
    }
`