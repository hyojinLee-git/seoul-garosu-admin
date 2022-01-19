import React from 'react';
import { Link } from 'react-router-dom';
import {MenuUl} from './style'

const Menu = () => {

    const menuList=[
        {
            title:'홈',
            link:'/1',
        },{
            title:'입양관리',
            link:'/main',
        },{
            title:'목표관리',
            link:'/2',
        },{
            title:'나무관리',
            link:'/tree',
        },{
            title:'교육관리',
            link:'/4',
        },{
            title:'봉사활동관리',
            link:'/5',
        }
    ]
    return (
        <MenuUl>
            {menuList.map((menuItem)=>(
                <li key={menuItem.title}><Link to={menuItem.link}>{menuItem.title}</Link></li>
            ))}
        </MenuUl>
    );
};

export default Menu;