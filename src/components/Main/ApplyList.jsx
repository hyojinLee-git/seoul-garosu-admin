import React, { useEffect, useState } from 'react';
import {ApplyListUl,CheckBox} from './style'
import { authService } from '../../utils/firebase';
import {getDatabase,ref,child,get} from 'firebase/database'
const ApplyList = () => {
    const [applyList,setApplyList]=useState([])
    
    //get data from firebase
    const fetchData=()=>{
        const dbRef=ref(getDatabase());
        get(child(dbRef,`/Candidates`))
        .then(res=>{
            if(res.exists()){
                console.log(Object.values(res.val()))
                setApplyList(Object.values(res.val()))

            }
        })
        .catch(error=>{
            console.log(error)
        })
    }
    useEffect( ()=>{
        console.log(authService.currentUser.uid)
        fetchData()
    },[])
    return (

            <ApplyListUl>
                {
                    applyList.map(applyItem=>(
                       <li key={applyItem.tree_id}>
                           <CheckBox type="checkbox"/>
                           <span>icon</span>
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