import React from 'react';
import person from '../../assets/Main/ClassificationBar/person.png'
import school from '../../assets/Main/ClassificationBar/school.png'
import supervisorAccount from '../../assets/Main/ClassificationBar/supervisor-account.png'
import {ClassificationButton,ClassificationBarDiv} from './style'
const ClassificationBar = ({onChangeTab,currentTab}) => {
    
    const buttonList=[
        {
            icon:person,
            title:'개인',
            color:'#EC8D71'
        },{
            icon:supervisorAccount,
            title:'단체',
            color:'#5DA283'
        },{
            icon:school,
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
                        <img src={buttonItem.icon} alt={buttonItem.title}/>
                        {buttonItem.title}
                    </ClassificationButton>
                ))
            }
        </ClassificationBarDiv>
    );
};

export default ClassificationBar;