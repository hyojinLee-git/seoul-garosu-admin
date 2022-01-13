import React from 'react';
import {ApplyListUl} from './style'

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
                    <li>
                        <input type="checkbox"/>
                        
                    </li>
                ))
            }
        </ApplyListUl>
    );
};

export default ApplyList;