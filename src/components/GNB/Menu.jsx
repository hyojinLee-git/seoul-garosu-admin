import React from 'react';
import { Link } from 'react-router-dom';
import {MenuUl} from './style'

const Menu = () => {

    const menuList=['홈','입양관리','입양자관리','목표관리','나무관리','교육관리','봉사활동관리']
    return (
        <MenuUl>
            {menuList.map((menuItem)=>(
                <li key={menuItem}><Link to="/">{menuItem}</Link></li>
            ))}
        </MenuUl>
    );
};

export default Menu;