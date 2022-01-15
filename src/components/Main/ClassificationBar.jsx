import React from 'react';
import {MdPeopleAlt,MdPerson,MdSchool} from 'react-icons/md'
import {ClassificationButton,ClassificationBarDiv} from './style'
const ClassificationBar = ({onChangeTab,currentTab}) => {
    
    const buttonList=[
        {
            icon:<MdPerson size={24}/>,
            title:'개인',
            color:'#EC8D71'
        },{
            icon:<MdPeopleAlt size={24} style={{verticalAlign:""}}/>,
            title:'단체',
            color:'#5DA283'
        },{
            icon:<MdSchool size={24}/>,
            title:'학교',
            color:'#4ECBC4'
        },
    ]
  
    return (
        <ClassificationBarDiv>
            {
                buttonList.map((buttonItem,index)=>(
                    <ClassificationButton 
                        color={buttonItem.color} 
                        key={buttonItem.title} 
                        onClick={onChangeTab}
                        className={buttonItem.title===currentTab? 'active':''}
                    >
                        {buttonItem.icon}
                        <span>{buttonItem.title}</span>
                    </ClassificationButton>
                ))
            }
        </ClassificationBarDiv>
    );
};

export default ClassificationBar;