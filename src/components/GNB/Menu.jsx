import React, { useCallback, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {MenuLi, MenuUl} from './style'

const Menu = () => {
    const location=useLocation()


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
                <MenuLi key={menuItem.title}><Link className={menuItem.link===location.pathname? 'active':''} to={menuItem.link}>{menuItem.title}</Link></MenuLi>
            ))}
        </MenuUl>
    );
};

export default Menu;