import styled from "styled-components";

export const ListHeader=styled.div`
    display: grid;
    grid-template-columns: 4fr 1fr 1fr 1.5fr;
    /* border:1px solid red; */
    height: 45px;
    color:#848484;
    margin:10px 0;
    padding: 0 10px;
    box-sizing: border-box;
    &>*{
        margin-right: 5px;
        display: flex;
        align-items: center;
    }
    &>*:nth-child(3){
        margin:0 15px;
        justify-content: center;
    }

`
export const Ul=styled.ul`
    padding: 0;
    list-style: none;
    /* border:1px solid red;    */
    padding:0 10px;
    margin:0;
`

export const Li=styled.li`
    display: grid;
    grid-template-columns:1fr 3fr 1fr 1fr 1fr 0.5fr;
    height: 80px;

    box-sizing: border-box;
    /* border:1px solid red; */
    margin-bottom: 5px;
    &:hover{
        background: #F3F4F9;
    }
    &>*{
        display: flex;
        align-items: center;
        /* border:1px solid green; */
    }
    &>*:nth-child(1){
        justify-content: center;
    }
    &>*:nth-child(2){
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
    }
    &>*:nth-child(3){
        font-weight: bold;
    }
    &>*:nth-child(4){
        height: 40px;
        background-color: #9EE7E3;
        justify-content: center;
        border-radius: 20px;
        margin:0 15px;
        margin-top: 20px;
        font-weight: bold;
    }
    &>*:nth-child(6){
        justify-content: center;
        background: none;
        border:none;
        cursor: pointer;
    }

    .meta-title{
        margin:10px 0;
        
    }
`