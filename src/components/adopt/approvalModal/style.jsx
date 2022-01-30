import styled from "styled-components";

export const ApplyModalBG=styled.div`
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
export const ApplyModalWrapper=styled.div`
    background: white;
    width: 320px;
    height: 255px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & div{
        font-size: 25px;
        font-weight: bold;
        text-align:center;

    }
    & span{
        color:${props=>props.color}
    }
    & button{
        background: #30CDA8;
        color: white;
        outline: none;
        border:none;
        border-radius: 80px;
        width: 190px;
        height: 40px;
        margin-top: 30px;
        font-size: 15px;
        cursor: pointer;
    }
`