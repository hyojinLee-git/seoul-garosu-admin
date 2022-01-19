import React from 'react';
import {SideMenuUl} from './style'
import {MdDrafts,MdCheck,MdReport,MdRemoveCircle} from 'react-icons/md'
import {Link} from 'react-router-dom'

const SideMenu = () => {
    const menuList=[
        {
            icon:<MdDrafts size={24}/>,
            title:'전체 입양신청',
            link:'/'
        },{
            icon:<MdCheck size={24}/>,
            title:'승인한 입양신청',
            link:'/main/approval'
        },{
            icon:<MdReport size={24}/>,
            title:'반려한 입양신청',
            link:'/main/disapproval'
        },{
            icon:<MdRemoveCircle size={24}/>,
            title:'대기중인 입양신청',
            link:'/main/wait'
        },
    ]
    return (
        <SideMenuUl>
            {
                menuList.map(menuItem=>(
                    <li key={menuItem.title}>
                        <Link to={menuItem.link}>
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