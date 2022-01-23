import styled from "styled-components";

export const MainDiv=styled.div`
    width: 80vw;
    /* border:3px solid blue; */
    box-sizing: border-box;
    position: relative;
`

export const CheckBox=styled.input`
    width: 18px;
    height: 18px;
`



export const ApplyListUl=styled.ul`
    margin:0;
    padding:0;
    list-style: none;
    width: 100%;
    cursor: pointer;
    &>li{
        border-bottom:1px solid #EDEAE9;
        display: flex;
        height: 40px;
        align-items: center;
        padding:0 5px;
        
        &>*:nth-child(1){flex:0.5};
        &>*:nth-child(2){flex:0.5;display:flex;align-items:center};
        &>*:nth-child(3){flex:1};
        &>*:nth-child(4){flex:2};
        &>*:nth-child(5){flex:3};
        &>*:nth-child(6){flex:3};
        &>*:nth-child(7){flex:2};
    }
`
