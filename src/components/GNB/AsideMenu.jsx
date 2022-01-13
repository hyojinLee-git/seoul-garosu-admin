import React from 'react';
import person from '../../assets/person.png'
import {AsideDiv} from './style'

const AsideMenu = () => {
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
        </div>
    );
};

export default AsideMenu;