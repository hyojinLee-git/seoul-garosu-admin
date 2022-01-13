import React from 'react';
import person from '../../assets/Main/ClassificationBar/person.png'
import school from '../../assets/Main/ClassificationBar/school.png'
import supervisorAccount from '../../assets/Main/ClassificationBar/supervisor-account.png'
import {ClassificationButton} from './style'
const ClassificationBar = () => {
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
        <div>
            {
                buttonList.map((buttonItem)=>(
                    <ClassificationButton color={buttonItem.color} key={buttonItem.title}>
                        <img src={buttonItem.icon} alt={buttonItem.title}/>
                        {buttonItem.title}
                    </ClassificationButton>
                ))
            }
        </div>
    );
};

export default ClassificationBar;