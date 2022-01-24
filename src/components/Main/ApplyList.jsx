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
import axios from 'axios'
import { tokenState } from '../../state/tokenState';


const ApplyList = ({currentTab}) => {
    const [dataList,setDataList]=useRecoilState(fetchDataState)
    const [menu]=useRecoilState(menuState)
    const [checked,setChecked]=useRecoilState(checkboxState)
    const [color,setColor]=useState('#DADADA')
    const[checkedList,setCheckedList]=useRecoilState(checkedListState)
    const [showApplyModal,setShowApplyModal]=useRecoilState(applyModalState)
    const [clickedApply,setClickedApply]=useRecoilState(clickedApplyState)
    const dbURL=process.env.REACT_APP_DATABASE_URL;
    const [token,setToken]=useRecoilState(tokenState)
    //<해결해야 할 과제>
    //색깔 대충 설정함
    //firebase함수 걷어내기
    //checkbox 버그 해결하기
    //데이터 로딩 캐시처리 하고싶음

    //인증 토큰 세팅
    const getToken=async ()=>{
        authService.currentUser.getIdToken()
        .then(token=>setToken(token))
        .catch(e=>console.log(e))
    }

    //모달창 띄우기
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

    //key값 추가
    const addObjectKey=(obj)=>{
        for(let val in obj){
            obj[val]['key']=val   
        }
        return obj
    }

    //field추가
    const addField=(obj,field)=>{
        for(let val in obj){
            obj[val]['field']=field
        }
        return obj
    }


    //get data from firebase
    //리팩토링 하자..
    const fetchData=useCallback(()=>{
        const dbRef=ref(getDatabase());
        setDataList([])
        
        if(menu==='전체 입양신청'){

            const promise1=axios.get(`${dbURL}/Candidates.json?auth=${token}`)
            const promise2=axios.get(`${dbURL}/Trees_taken.json?auth=${token}`)
            Promise.all([promise1,promise2])
            .then(res=>{
                
                const preData1=addField(addObjectKey(res[0].data),'Candidates')
                const preData2=addField(addObjectKey(res[1].data),'Trees_taken')
                const data1=Object.values(preData1).filter((el)=>currentTab===el.unit)
                const data2=Object.values(preData2).filter((el)=>currentTab===el.unit)

                setDataList([...data1,...data2])
            })
            .catch(e=>console.log(e))

            
        } else if (menu==='승인한 입양신청'){
            //console.log(dataList)
            get(child(dbRef,`/Trees_taken`))
            .then(res=>{
                if(res.exists()){
                    const preData=addObjectKey(res.val())
                    const data=Object.values(preData).filter((fetchDataItem)=>currentTab===fetchDataItem.unit)
                    console.log(data)
                    setDataList(data)
                    setColor('#6AD39F')
                }
            })
            .catch((error)=>console.log(error))
        }else if(menu==='반려한 입양신청'){
            setDataList([])
        }
        else if (menu==='대기중인 입양신청'){
            axios.get(`${dbURL}/Candidates.json?auth=${token}`)
            .then(res=>{
                setDataList(Object.values(addObjectKey(res.data)))
                //console.log(res.data)
                setColor('#DADADA')
            })
            .catch(e=>console.log(e))


        } else{
            setDataList([])
        }
    },[currentTab, dbURL, menu, setDataList, token])

    //fetching data when component mounted
    useEffect( ()=>{
        setChecked(false)
        fetchData()
        return()=>{
            setChecked(false)
        }
    },[fetchData, setChecked])


    useEffect(()=>{
        getToken()
    },[])

    return (

            <ApplyListUl>
                {
                    dataList?.map((applyItem)=>(
                       <li 
                        key={applyItem.key} 
                        onClick={(e)=>onClickApplyItem(e,applyItem.key)}
                        >
                           <CheckBox 
                                type="checkbox" 
                                checked={checkedList.includes(applyItem)} 
                                onChange={(e)=>onChange(e.target.checked,applyItem.tree_id)}
                            />
                           <span>
                               <MdCircle size={24} color={applyItem.field==='Trees_taken'?'#6AD39F':'#DADADA'}/>
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

export default React.memo(ApplyList);