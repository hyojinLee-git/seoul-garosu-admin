import React, { useEffect, useState } from 'react';
import {SideMenuUl} from './style'
import { useLocation} from 'react-router-dom'
import {treeMenuList,mainMenuList} from './menuList'

const SideMenu = () => {
    const {pathname}=useLocation()
    const [route,setRoute]=useState(pathname)
    const [menuList,setMenuList]=useState(mainMenuList)
    const setMenuListFunction=(route)=>{
        switch(route){
            case '/main':
                return mainMenuList
            case '/tree':
                return treeMenuList
            default:
                return 
        }
    }
    useEffect(()=>{
        setRoute(pathname)
        //refactoring 필요
        setMenuList(setMenuListFunction(route))

    },[pathname, route, setRoute])
    
    return (
        <SideMenuUl>
            {
                menuList?.map(menuItem=>(
                    <li key={menuItem.title}>
                        <button>
                            {menuItem.icon}
                            <span>{menuItem.title}</span>
                        </button>
                    </li>
                ))
            }
        </SideMenuUl>
    );
};

export default SideMenu;