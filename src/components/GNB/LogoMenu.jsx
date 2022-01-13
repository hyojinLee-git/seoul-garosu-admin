import React from 'react';
import Logo from '../../assets/GNB/logo.png'
// import Logo from '@assets/logo.png'
import {LogoDiv} from './style'

const LogoMenu = () => {
    return (
        <LogoDiv>
            <img src={Logo} alt="logo"/>
            <span className='title'>서울가로수</span>
            <span className='sub-title'>ADMIN</span>
        </LogoDiv>
    );
};

export default LogoMenu;