import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {MenuLi, MenuUl} from './style'

const Menu = () => {
    const location=useLocation()

    const menuList=[
        {
            title:'홈',
            link:'/home',
        },{
            title:'입양관리',
            link:'/adopt/all',
        },{
            title:'목표관리',
            link:'/goal',
        },{
            title:'나무관리',
            link:'/tree/map',
        },{
            title:'교육관리',
            link:'/education/education',
        },{
            title:'봉사활동관리',
            link:'/5',
        }
    ]
    return (
        <MenuUl>
            {menuList.map((menuItem)=>(
                <MenuLi key={menuItem.title}><Link className={menuItem.link===location.pathname? 'active':''} to={menuItem.link}>{menuItem.title}</Link></MenuLi>
            ))}
        </MenuUl>
    );
};

export default Menu;