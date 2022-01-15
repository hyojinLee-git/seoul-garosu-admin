import React from 'react';
import {SideMenuUl} from './style'
import {MdDrafts,MdCheck,MdReport,MdRemoveCircle} from 'react-icons/md'

const SideMenu = () => {
    const menuList=[
        {
            icon:<MdDrafts size={24}/>,
            title:'전체 입양신청'
        },{
            icon:<MdCheck size={24}/>,
            title:'승인한 입양신청'
        },{
            icon:<MdReport size={24}/>,
            title:'반려한 입양신청'
        },{
            icon:<MdRemoveCircle size={24}/>,
            title:'대기중인 입양신청'
        },
    ]
    return (
        <SideMenuUl>
            {
                menuList.map(menuItem=>(
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