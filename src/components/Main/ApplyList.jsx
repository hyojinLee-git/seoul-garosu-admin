import React from 'react';
import {ApplyListUl,CheckBox} from './style'

const ApplyList = () => {
    const applyList=[
        {
            name:'이름',
            location:'입양자지역',
            treeLocation:'가로수위치',
            treeType:'나무종류',
            date:'1월12일10:13'
        },{
            name:'이름',
            location:'입양자지역',
            treeLocation:'가로수위치',
            treeType:'나무종류',
            date:'1월12일10:13'
        },{
            name:'이름',
            location:'입양자지역',
            treeLocation:'가로수위치',
            treeType:'나무종류',
            date:'1월12일10:13'
        },{
            name:'이름',
            location:'입양자지역',
            treeLocation:'가로수위치',
            treeType:'나무종류',
            date:'1월12일10:13'
        },{
            name:'이름',
            location:'입양자지역',
            treeLocation:'가로수위치',
            treeType:'나무종류',
            date:'1월12일10:13'
        },
        
    ]
    return (

            <ApplyListUl>
                {
                    applyList.map(applyItem=>(
                       <li key={applyItem.treeLocation}>
                           <CheckBox type="checkbox"/>
                           <span>icon</span>
                           <span>{applyItem.name}</span>
                           <span>{applyItem.location}</span>
                           <span>{applyItem.treeLocation}</span>
                           <span>{applyItem.treeType}</span>
                           <span>{applyItem.date}</span>
                       </li>
                    ))
                }
            </ApplyListUl>

    );
};

export default ApplyList;