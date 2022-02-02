
import styled from "styled-components";

export const UploadModalContainer=styled.div`
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

export const UploadModalContentsWrapper=styled.div`
    width: 920px;
    height: 82vh;
    background: white;
    padding:0 20px;
    box-sizing: border-box;

`

export const UploadModalContentsHeader=styled.div`
    width: 100%;
    height: 10vh;
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

export const UploadModalTab=styled.div`
    height: 10vh;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 10px 0;
    box-sizing: border-box;

`
export const Button=styled.button`
    border:${props=>props.border||'none'};
    background: ${props=>props.background};
    color:${props=>props.color};
    border-radius: ${props=>props.radius};
    width: 120px;
    height: 50px;
    font-size: 25px;
    cursor: pointer;
    outline: none;
    &.active{
        border-bottom: 3px solid #669AFF;
        color:#669AFF
    }
`
export const UploadModalBodyWrapper=styled.div`
    height: 70%;
`
export const Wrapper=styled.div`
    border:1px solid #828282;
    width: ${props=>props.width};
    height: ${props=>props.height};
    border-radius: 10px;
    margin:20px 0;
    padding: 10px 20px;
    box-sizing: border-box;
    & label{
        font-size: 25px;
    }
    & textarea{
        width: 100%;
        height: 60%;
        border:none;
        margin-top:10px
    }
`
