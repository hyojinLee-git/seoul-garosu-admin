import React, { useEffect, useState } from 'react';
import {SideMenuUl} from './style'
import { useLocation} from 'react-router-dom'
import {treeMenuList,mainMenuList} from './menuList'
import { useRecoilState } from 'recoil';
import { menuState } from '../../state/menuState';

const SideMenu = () => {
    const {pathname}=useLocation()
    const [route,setRoute]=useState(pathname)
    const [menuList,setMenuList]=useState(mainMenuList)
    const [menu,setMenu]=useRecoilState(menuState)

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

    //버튼 클릭시 menu 바뀜
    const onClickMenu=(e)=>{
        setMenu(e.currentTarget.lastChild.innerText)
        
    }
    //route 설정, route에 따라 menuList 바뀌어서 반환
    useEffect(()=>{
        setRoute(pathname)
        //refactoring 필요
        setMenuList(setMenuListFunction(route))

    },[pathname, route, setRoute,menu])
    
    return (
        <SideMenuUl>
            {
                menuList?.map(menuItem=>(
                    <li key={menuItem.title} >
                        <button onClick={onClickMenu} style={{color:menu===menuItem.title?'#44AB9A':''}}>
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