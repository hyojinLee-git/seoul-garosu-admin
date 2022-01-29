import styled from "styled-components";

export const TreeWrapper=styled.div`
    height: 90vh;
    width: 100%;
    box-sizing: border-box;
    padding:5vh 120px ;
`
export const DailyLogWrapper=styled.div`
    border:2px solid #EDEAE9;
    box-sizing: border-box;
    flex: 1;
    height:calc(90vh*0.15);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding:0 30px;
    padding-bottom: 10px;
    font-size:18px;
    & h3{
        margin:10px 0;
    }
    &>div>div{
        display: flex;
        justify-content: space-between;
        
    }
`

export const WeeklyLogWrapper=styled.div`
    border:2px solid #EDEAE9;
    box-sizing: border-box;
    flex: 2;
    height:calc(90vh*0.15);
    margin-left: 15px;
`
export const Wrapper=styled.div`
    height: 50%;
    border-top:${props=>props.border||''};
    display: flex;
    justify-content: space-around;
    align-items: center;
    color:${props=>props.color};
    font-size: ${props=>props.size};
    & .today{
        color:#35CDA8;
    }

`



export const MapWrapper=styled.div`
        /* border:1px solid red; */
    box-sizing: border-box;
    height: calc(90vh*0.5);
    margin: 15px 0;
`

export const ContentsWrapper=styled.div`
    border:2px solid #EDEAE9;
    flex:1;
    height:calc(90vh*0.2) ;
    margin-left: ${props=>props.margin||''};
    padding:0 30px;
    font-size: 18px;
    & h3{margin:15px 0}
    &>*:nth-child(2){color:#35CDA8}
    &>*:nth-child(3){color:#707070}
    
`