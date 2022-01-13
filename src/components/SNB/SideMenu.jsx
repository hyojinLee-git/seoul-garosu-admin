import React from 'react';
import { Link } from 'react-router-dom';
import {SideMenuUl} from './style'
import drafts from '../../assets/SNB/drafts.png'
import check from '../../assets/SNB/check.png'
import report from '../../assets/SNB/report.png'
import removeCircleOutline from '../../assets/SNB/remove-circle-outline.png'

const SideMenu = () => {
    const menuList=[
        {
            icon:drafts,
            title:'전체 입양신청'
        },{
            icon:check,
            title:'승인한 입양신청'
        },{
            icon:report,
            title:'반려한 입양신청'
        },{
            icon:removeCircleOutline,
            title:'대기중인 입양신청'
        },
    ]
    return (
        <SideMenuUl>
            {
                menuList.map(menuItem=>(
                    <li key={menuItem.title}>
                        <button>
                            <img src={menuItem.icon} alt={menuItem.title}/>
                            {menuItem.title}
                        </button>
                    </li>
                ))
            }
        </SideMenuUl>
    );
};

export default SideMenu;