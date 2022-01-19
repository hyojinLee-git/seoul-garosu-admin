import React, { useCallback, useEffect, useState } from 'react';
import {ApplyListUl,CheckBox} from './style'
import { authService } from '../../utils/firebase';
import {getDatabase,ref,child,get} from 'firebase/database'
import {MdCircle} from 'react-icons/md'
const ApplyList = ({currentTab}) => {
    const [applyList,setApplyList]=useState([])

    //get data from firebase
    const fetchData=useCallback(()=>{
        const dbRef=ref(getDatabase());
        get(child(dbRef,`/Candidates`))
        .then(res=>{
            if(res.exists()){
                const data=Object.values(res.val()).filter((fetchDataItem)=>currentTab===fetchDataItem.unit)
                console.log(data)
                setApplyList(data)
            }
        })
        .catch(error=>{
            console.log(error)
        })
    },[currentTab])

    useEffect( ()=>{
        //console.log(authService.currentUser.uid)
        fetchData()
    },[fetchData])

    return (

            <ApplyListUl>
                {
                    applyList.map(applyItem=>(
                       <li key={applyItem.tree_id}>
                           <CheckBox type="checkbox"/>
                           <span>
                               {<MdCircle size={24} color='#DADADA'/>}
                            </span>
                           <span>{applyItem.name}</span>
                           <span>{applyItem.location}</span>
                           <span>{applyItem.tree_location}</span>
                           <span>{applyItem.tree_type}</span>
                           <span>{applyItem.date}</span>
                       </li>
                    ))
                }
            </ApplyListUl>

    );
};

export default ApplyList;