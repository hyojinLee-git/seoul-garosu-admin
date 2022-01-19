import React, { useCallback, useEffect, useState } from 'react';
import {ApplyListUl,CheckBox} from './style'
import { authService } from '../../utils/firebase';
import {getDatabase,ref,child,get} from 'firebase/database'
import {MdCircle} from 'react-icons/md'
import { useRecoilState } from 'recoil';
import { menuState } from '../../state/menuState';
const ApplyList = ({currentTab}) => {
    const [applyList,setApplyList]=useState([])
    const [menu]=useRecoilState(menuState)
    const [color,setColor]=useState('#DADADA')

    //get data from firebase
    //리팩토링 하자..
    const fetchData=useCallback(()=>{
        const dbRef=ref(getDatabase());
        if (menu==='승인한 입양신청'){
            get(child(dbRef,`/Trees_taken`))
            .then(res=>{
                if(res.exists()){
                    const data=Object.values(res.val())
                    console.log(data)
                    setApplyList(data)
                    setColor('#6AD39F')
                }
            })
            .catch((error)=>console.log(error))
        }else if (menu==='대기중인 입양신청'){
            get(child(dbRef,`/Candidates`))
            .then(res=>{
                if(res.exists()){
                    const data=Object.values(res.val()).filter((fetchDataItem)=>currentTab===fetchDataItem.unit)
                    console.log(data)
                    setApplyList(data)
                    setColor('#DADADA')
                }
            })
            .catch(error=>console.log(error))
        }else if(menu==='반려한 입양신청'){
            setApplyList([])
        }else{
            setApplyList([])
        }
    },[currentTab,menu])

    useEffect( ()=>{
        //console.log(authService.currentUser.uid)
        fetchData()
    },[fetchData])

    return (

            <ApplyListUl>
                {
                    applyList?.map(applyItem=>(
                       <li key={applyItem.tree_id}>
                           <CheckBox type="checkbox"/>
                           <span>
                               <MdCircle size={24} color={color}/>
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