import styled from "styled-components";

export const Form=styled.form`
    position: absolute;
    top:50%;
    right: 10%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    align-items:center;
`
export const Label=styled.label`
    display: block;
    margin:20px;
`
export const Input=styled.input`
    width: 325px;
    height: 60px;
    border:1px solid rgba(0, 0, 0, 0.4);
    border-radius: 80px;
    box-sizing: border-box;
    padding: 20px;
    font-size: 20px;
    
`
export const Button=styled.button`
    width: 325px;
    height: 60px;
    color:white;
    background: #30CDA8;
    border:none;
    outline: none;
    border-radius: 80px;
    font-size: 24px;
    margin:20px;
    cursor: pointer;
`

export const LogoDiv=styled.div`
    font-size: 50px;
    font-weight: bold;
    position: absolute;
    top:150px;
    left: 75px;

    & img{
        width: 50px;
        height: 50px;
        margin-right: 10px;
    }
`
export const MetaData=styled.div`
    font-size:35px;
    width: 550px;
    position: absolute;
    top:350px;
    left:75px;
`

export const Error=styled.div`
    color:#e01e5a;
`
