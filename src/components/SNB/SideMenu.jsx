import React, { useEffect, useState } from 'react';
import {SideMenuUl} from './style'
import { Link, useLocation} from 'react-router-dom'
import {treeMenuList,mainMenuList} from './menuList'
import { useRecoilState } from 'recoil';
import { menuState } from '../../state/menuState';

const SideMenu = () => {
    const {pathname}=useLocation()
    const [route,setRoute]=useState(pathname)
    const [menuList,setMenuList]=useState(mainMenuList)
    const [currentMenu,setCurrentMenu]=useRecoilState(menuState)

    //route에 따라 menuList 반환
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

    //버튼 클릭시 currentMenu 바뀜
    const onClickMenu=(e)=>{
        setCurrentMenu(e.currentTarget.lastChild.innerText)
    }
    
    //route 설정, route에 따라 menuList 바뀌어서 반환
    useEffect(()=>{
        setRoute(pathname)

        //refactoring 필요
        setMenuList(setMenuListFunction(route))

        setCurrentMenu(menuList[0].title)

        
        

    },[pathname, route, setRoute, setCurrentMenu, menuList])
    return (
        <SideMenuUl>
            {
                menuList?.map(menuItem=>(
                    <li key={menuItem.title} >
                        <button to={menuItem.link} onClick={onClickMenu} style={{color:currentMenu===menuItem.title?'#44AB9A':''}}>
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