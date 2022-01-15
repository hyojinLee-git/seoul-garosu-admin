import styled from 'styled-components'

export const GNB=styled.nav`
    display: flex;
    align-items: center;
    height:10vh;
    box-shadow:0 1px 0 0 #EDEAE9;
    &>*{height:100%;}
    &>*:nth-child(1){flex:1.8;}
    &>*:nth-child(2){flex:6;}
    &>*:nth-child(3){flex:1;}

`

export const MenuUl=styled.ul`
    display: flex;
    list-style: none;
    padding:0;
    margin:0;
    align-items: center;
    & li{
        margin:0 10px;
    }
    & *:hover{
        color:#44AB9A;
    }
    & a{
        text-decoration: none;
        color:black
    }

`
export const LogoDiv=styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    & img{
        height: 30px;
        width: 30px;
    }
    & .title{
        font-weight:bold;
        font-size: 20px;
        margin-left:5px;

    }
    & .sub-title{
        color:rgba(0,0,0,0.4);
        margin-left:10px;
    }
`

export const AsideDiv=styled.div`
    display: flex;
    position: absolute;
    right: 10px;
    top:50%;
    transform: translate(0,-50%);
    background-color: #6AD39F;
    width: 70px;
    height: 38px;
    justify-content: center;
    align-items: center;
    border-radius: 30px;
    & span{
        display: block;
        width: 12px;
        height: 2px;
        background-color: black;
        margin-bottom: 2px;
        margin-left: 5px;
    }
    & .profile{
        background:#EDEAE9;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        margin-left:15px;
    }
`
