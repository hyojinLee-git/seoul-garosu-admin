import React from 'react';
import person from '../../assets/GNB/person.png'
import { authService } from '../../utils/firebase';
import {AsideDiv} from './style'
import {signOut } from 'firebase/auth'
import { useRecoilState } from 'recoil';
import { loginState } from '../../state/login/loginState';

const AsideMenu = () => {
    const [,setLogin]=useRecoilState(loginState)
    //logout function
    const onLogout=()=>{
        try{
            signOut(authService)
            setLogin(false)
            console.log('logout')
        }catch(e){
            console.log(e)
        }
        
    }
    return (
        <div style={{position:"relative"}}>
            <AsideDiv>
                <div>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <span className='profile'>
                    <img src={person} alt="profile"/>
                </span>
            </AsideDiv>
            <button onClick={onLogout}>logout</button>
        </div>
    );
};

export default AsideMenu;