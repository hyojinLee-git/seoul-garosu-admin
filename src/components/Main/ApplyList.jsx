import React, { useCallback, useEffect, useState } from 'react';
import {ApplyListUl,CheckBox} from './style'
import { authService } from '../../utils/firebase';
import {getDatabase,ref,child,get, set} from 'firebase/database'
import {MdCircle} from 'react-icons/md'
import { useRecoilState } from 'recoil';
import { menuState } from '../../state/menuState';
import { checkboxState } from '../../state/checkboxState';
import { fetchDataState } from '../../state/fetchDataState';
import { applyModalState,clickedApplyState } from '../../state/applyModalState';
import { checkedListState } from '../../state/checkedListState';
//import { checkedListState } from '../../state/dataListState';
const ApplyList = ({currentTab}) => {
    const [dataList,setDataList]=useRecoilState(fetchDataState)
    //const [dataList,setDataList]=useState([])
    const [menu]=useRecoilState(menuState)
    //const [check,setCheck]=useRecoilState(checkboxState)
    const [color,setColor]=useState('#DADADA')
    const[checkedList,setCheckedList]=useRecoilState(checkedListState)
    const [showApplyModal,setShowApplyModal]=useRecoilState(applyModalState)
    const [clickedApplyList,setClickedApplyList]=useState(clickedApplyState)
    //const [checkedList,setCheckedList]=useRecoilState(checkedListState)

    //이벤트전파때매 안되는중ㅠㅠ
    const onClickApplyItem=(e)=>{
        //console.log(e.target)
        e.stopPropagation()
        //음.........어캐하징ㅎ
        //setShowApplyModal(true)
        //setClickedApplyList(treeId)
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
        console.log(checked)
        console.log(checkedList)

    }
    

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
                    setDataList(data)
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
        // return()=>{
        //     setCheck(false)
        // }
    },[ fetchData])

    return (

            <ApplyListUl>
                {
                    dataList?.map((applyItem)=>(
                       <li key={applyItem.tree_id} onClick={onClickApplyItem}>
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