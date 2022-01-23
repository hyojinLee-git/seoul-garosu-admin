import React, { useCallback, useEffect, useState } from 'react';
import {ApplyListUl,CheckBox} from './style'
import { authService } from '../../utils/firebase';
import {getDatabase,ref,child,get, set} from 'firebase/database'
import {MdCircle} from 'react-icons/md'
import { useRecoilState, useResetRecoilState } from 'recoil';
import { menuState } from '../../state/menuState';
import { checkboxState } from '../../state/checkboxState';
import { fetchDataState } from '../../state/fetchDataState';
import { applyModalState,clickedApplyState } from '../../state/applyModalState';
import { checkedListState } from '../../state/checkedListState';

const ApplyList = ({currentTab}) => {
    const [dataList,setDataList]=useRecoilState(fetchDataState)
    const [menu]=useRecoilState(menuState)
    const [checked,setChecked]=useRecoilState(checkboxState)
    const [color,setColor]=useState('#DADADA')
    const[checkedList,setCheckedList]=useRecoilState(checkedListState)
    const [showApplyModal,setShowApplyModal]=useRecoilState(applyModalState)
    const [clickedApply,setClickedApply]=useRecoilState(clickedApplyState)


    const onClickApplyItem=(e,key)=>{
        if(e.target.tagName==='INPUT') return
        setShowApplyModal(true)
        setClickedApply(key)
    }

    //input 값 change
    const onChange=(checked,treeId)=>{

        if(checked){
            const checkedData=dataList.filter(el=>el.tree_id===treeId)
            setCheckedList([...checkedList,checkedData[0]])
        }else{
            setCheckedList(
                checkedList.filter(el=>el.tree_id!==treeId)
            )
        }

    }

    const addObjectKey=(obj)=>{
        for(let val in obj){
            obj[val]['key']=val   
        }
        return obj
    }
    

    //get data from firebase
    //리팩토링 하자..
    const fetchData=useCallback(()=>{
        const dbRef=ref(getDatabase());
        if (menu==='승인한 입양신청'){
            get(child(dbRef,`/Trees_taken`))
            .then(res=>{
                if(res.exists()){
                    const preData=addObjectKey(res.val())
                    const data=Object.values(preData)
                    console.log(data)
                    setDataList(data)
                    setColor('#6AD39F')
                }
            })
            .catch((error)=>console.log(error))
        }else if (menu==='대기중인 입양신청'){
            get(child(dbRef,`/Candidates`))
            .then(res=>{
                if(res.exists()){
                    const preData=addObjectKey(res.val())
                    const data=Object.values(preData).filter((fetchDataItem)=>currentTab===fetchDataItem.unit)
                    console.log(data)
                    setDataList(data)
                    setColor('#DADADA')
                    // console.log(res)
                    // console.log('keys',Object.keys(res.val()))
                }
            })
            .catch(error=>console.log(error))
        }else if(menu==='반려한 입양신청'){
            setDataList([])
        }else{
            setDataList([])
        }
    },[currentTab, menu, setDataList])

    //fetching data when component mounted
    useEffect( ()=>{
        //console.log(authService.currentUser.uid)
        fetchData()
        return()=>{
            setChecked(false)
        }
    },[fetchData, setChecked])

    return (

            <ApplyListUl>
                {
                    dataList?.map((applyItem)=>(
                       <li 
                        key={applyItem.tree_id} 
                        onClick={(e)=>onClickApplyItem(e,applyItem.key)}
                        >
                           <CheckBox 
                                type="checkbox" 
                                checked={checkedList.includes(applyItem)} 
                                onChange={(e)=>onChange(e.target.checked,applyItem.tree_id)}
                            />
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