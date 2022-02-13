import React, { useEffect, useState } from 'react';
import {SideMenuUl} from './style'
import { Link, useParams} from 'react-router-dom'
import {treeMenuList,mainMenuList,educationMenuList} from './menuList'

const SideMenu = () => {

    const [menuList,setMenuList]=useState(mainMenuList)
    const {mainMenu,sideMenu}=useParams()
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
    
    //route 설정, route에 따라 menuList 바뀌어서 반환
    useEffect(()=>{
        //refactoring 필요
        setMenuList(setMenuListFunction(mainMenu))


    },[menuList, mainMenu])
    return (
        <SideMenuUl>
            {
                menuList?.map(menuItem=>(
                    <li key={menuItem.title} >
                        <Link to={menuItem.link}
                            style={{color:sideMenu===menuItem.link.split('/')[2]?'#44AB9A':''}}
                        >
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