import styled from "styled-components";

export const ApplyModalDiv=styled.div`
        width: 100vw;
    height: 100vh;
    position: absolute;
    top:0;
    left:0;
    background:rgba(0, 0, 0, 0.3) ;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const ApplyModalContentsWrapper=styled.div`
    width: 920px;
    height: 840px;
    background: white;
    padding:0 20px;
    box-sizing: border-box;

`

export const ApplyModalContentsHeader=styled.div`
    width: 100%;
    height: 10%;
    border-bottom: 1px solid #828282;
    display: flex;
    align-items: center;
    justify-content: space-between;
    & h1 {
        display: inline;
        font-weight: 400;
        margin-left:20px;
        font-size: 30px;
    }
    & button{
        background: none;
        outline: none;
        border:none;
        cursor: pointer;
    }
`

export const ApplyModalContentsMeta=styled.div`
    width: 100%;
    height: 10%;
    font-size:25px ;
    color:#828282;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0 10px;
`
export const Button=styled.button`
    background: none;
    outline: none;
    border:none;
    cursor: pointer;
    background: ${props=>props.color};
    width: 120px;
    height: 50px;
    color:white;
    border-radius: 5px;
    font-size: 25px;
    margin-left:20px ;
`
export const ApplyModalContentsBody=styled.div`
    border:1px solid #828282;
    height: 640px;
    width: 100%;
    border-radius: 10px;
    padding:0 40px ;
    box-sizing: border-box;
    font-size: 20px;
    & h3{
        font-weight: 400;
        font-size: 25px;
    }
`