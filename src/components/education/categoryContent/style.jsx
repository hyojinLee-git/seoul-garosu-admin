import styled from "styled-components";

export const Button=styled.button`
    background: ${props=>props.color};
    border:none;
    outline: none;
    cursor: pointer;
    width: 100px;
    height: 35px;
    font-size: 14px;
    font-weight: bold;
    border-radius: 10px;
    margin-right: 20px;
    &.current-category{
        border:3px solid #669AFF;
    }

`
export const Input=styled.input`
    background: rgba(132, 132, 132, 0.15);
    width: 500px;
    height: 40px;
    font-size: 20px;
    outline: none;
    border:none;
    border-radius: 10px;
    box-sizing: border-box;
    padding: 15px 20px;
    margin-left: 30px;
`
export const CategoryForm=styled.form`
    display: flex;
    justify-content: flex-start;
    height:10vh ;
    align-items: center;
`
export const FormButton=styled.button`
    background: none;
    height: 40px;
    font-size: 20px;
    font-weight: bold;
    color:#828282;
    cursor: pointer;
    border:none;
    outline: none;
    &:hover{
        text-decoration: underline;
    }
`