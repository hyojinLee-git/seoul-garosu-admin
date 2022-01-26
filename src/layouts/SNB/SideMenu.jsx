import React, { useEffect, useState } from 'react';
import {SideMenuUl} from './style'
import { Link, useLocation, useParams} from 'react-router-dom'
import {treeMenuList,mainMenuList,educationMenuList} from './menuList'
import { useRecoilState } from 'recoil';
import { menuState } from '../../state/menuState';

const SideMenu = () => {

    const [menuList,setMenuList]=useState(mainMenuList)
    const [currentMenu,setCurrentMenu]=useRecoilState(menuState)
    const params=useParams()
    //route에 따라 menuList 반환
    const setMenuListFunction=(route)=>{

        switch(route){
            case 'adopt':
                return mainMenuList
            case 'education':
                return educationMenuList
            case 'tree':
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
        console.log(params.mainMenu)
        //refactoring 필요
        setMenuList(setMenuListFunction(params.mainMenu))
        if(menuList){
            setCurrentMenu(menuList[0].title)
        }
        

        
        

    },[setCurrentMenu, menuList, params.mainMenu])
    return (
        <SideMenuUl>
            {
                menuList?.map(menuItem=>(
                    <li key={menuItem.title} >
                        <Link to={menuItem.link} onClick={onClickMenu} style={{color:currentMenu===menuItem.title?'#44AB9A':''}}>
                            {menuItem.icon}
                            <span>{menuItem.title}</span>
                        </Link>
                    </li>
                ))
            }
        </SideMenuUl>
    );
};

export default SideMenu;