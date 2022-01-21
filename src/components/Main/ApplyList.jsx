import React, { useCallback, useEffect, useState } from 'react';
import {ApplyListUl,CheckBox} from './style'
import { authService } from '../../utils/firebase';
import {getDatabase,ref,child,get, set} from 'firebase/database'
import {MdCircle} from 'react-icons/md'
import { useRecoilState } from 'recoil';
import { menuState } from '../../state/menuState';
import { checkboxState } from '../../state/checkboxState';
import { dataListState } from '../../state/dataListState';
import { applyModalState,clickedApplyState } from '../../state/applyModalState';
//import { checkedListState } from '../../state/dataListState';
const ApplyList = ({currentTab}) => {
    //const [dataList,setDataList]=useRecoilState(dataListState)
    const [dataList,setDataList]=useState([])
    const [menu]=useRecoilState(menuState)
    const [check,setCheck]=useRecoilState(checkboxState)
    const [color,setColor]=useState('#DADADA')
    const [showApplyModal,setShowApplyModal]=useRecoilState(applyModalState)
    const [clickedApplyList,setClickedApplyList]=useState(clickedApplyState)
    //const [checkedList,setCheckedList]=useRecoilState(checkedListState)

    const onClickApplyItem=(treeId)=>{
        setShowApplyModal(true)
        setClickedApplyList(treeId)
    }
    //input 값 change
    const onChange=(treeId)=>{

        if(check) setCheck(false)
        setDataList(
            dataList.map(applyItem=>
                    applyItem.tree_id===treeId? {...applyItem,checked:!applyItem.checked}:applyItem
                )
        )  

    }
    //배열에 checked 속성 추가
    const concatChecked=(data)=>{
        for (let i=0;i<data.length;i++){
            data[i]['checked']=false
        }
        return data
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

                    const newData=concatChecked(data)
                    console.log(newData)
                    setDataList(newData)
                    setColor('#6AD39F')
                }
            })
            .catch((error)=>console.log(error))
        }else if (menu==='대기중인 입양신청'){
            get(child(dbRef,`/Candidates`))
            .then(res=>{
                if(res.exists()){
                    



                    const data=Object.values(res.val()).filter((fetchDataItem)=>currentTab===fetchDataItem.unit)
                    const newData=concatChecked(data)
                    console.log(newData)
                    setDataList(newData)
                    setColor('#DADADA')
                    console.log(res)
                    console.log('keys',Object.keys(res.val()))
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


        // if (checked){
        //     dataList.map(applyItem=>applyItem.checked=true)
        // }
        // else{
        //     dataList.map(applyItem=>applyItem.checked=false)
        // }
        // console.log(dataList)






        return()=>{
            setCheck(false)
        }
    },[ fetchData, setCheck])

    //모든 dataList checked 속성 바꾸기
    useEffect(()=>{
        if (check){
            dataList.map(applyItem=>applyItem.checked=true)
        }
        else{
            dataList.map(applyItem=>applyItem.checked=false)
        }
        
        console.log(check)
        console.log(dataList[0]?.checked)
    },[ dataList, check])

    // useEffect(()=>{
    //     if (checked){
    //         const checkedList=[]
    //         dataList.map((el)=>checkedList.push(el))

    //     }
    // },[])

    return (

            <ApplyListUl>
                {
                    dataList?.map((applyItem)=>(
                       <li key={applyItem.tree_id} onClick={()=>onClickApplyItem(applyItem.tree_id)}>
                           <CheckBox 
                                type="checkbox" 
                                checked={applyItem.checked} 
                                onChange={()=>onChange(applyItem.tree_id)}
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