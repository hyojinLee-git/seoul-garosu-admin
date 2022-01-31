import styled from "styled-components";

export const EducationContainer=styled.div`
    width: 100%;
    height: 90vh;
    /* border:3px solid blue; */
    box-sizing: border-box;
    padding: 0 10px;
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
export const ListHeader=styled.div`

    height: 45px;
    color:#848484;
    display: flex;
    align-items: center;
    padding: 3px;
    box-sizing: border-box;
    &>*{
        margin-right: 5px;
    }
    & *:nth-child(1){flex:4}
    & *:nth-child(2){flex:1}
    & *:nth-child(3){flex:1}
    & *:nth-child(4){flex:1.5}
`
export const Ul=styled.ul`
    padding: 0;
    list-style: none;
    
`
export const Li=styled.li`
    display:flex;
    padding:3px;
    /* border:1px solid red; */
    align-items: center;
    box-sizing: border-box;
    height: 80px;
    &:hover{
        background: #F3F4F9;
    }

    &>*{
        /* border:1px solid green; */
        margin-right: 5px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        
    }
    & *:nth-child(1){flex:1}
    & *:nth-child(2){
        flex:3;
        flex-direction:column;
        align-items:start;
        
    }
    & *:nth-child(3){flex:1}
    & *:nth-child(4){
        flex:1;
        display: inline-block;
        width:160px;
        height:40px;
        background:#9EE7E3;
        border-radius:20px;
        text-align:center;
    }
    & *:nth-child(5){flex:1}
    & *:nth-child(6){flex:0.5}
`