import React, { useCallback, useEffect, useState } from 'react';
import {ApplyListUl,CheckBox} from './style'
import {MdCircle} from 'react-icons/md'
import { useRecoilState } from 'recoil';
import { checkboxState } from '../../state/checkboxState';
import { fetchDataState } from '../../state/fetchDataState';
import { applyModalState } from '../../state/applyModalState';
import { checkedListState } from '../../state/checkedListState';
import axios from 'axios'
import { tokenState } from '../../state/tokenState';
import {  useParams } from 'react-router-dom';
import { currentPageState } from '../../state/currentPageState';
import { dateAscending } from '../../utils/sortFunction';
import { submitState } from '../../state/education/submitState';

const ApplyList = ({currentTab}) => {
    const [dataList,setDataList]=useRecoilState(fetchDataState)
    const [,setChecked]=useRecoilState(checkboxState)
    const[checkedList,setCheckedList]=useRecoilState(checkedListState)
    const [,setShowApplyModal]=useRecoilState(applyModalState)
    const [submit,setSubmit]=useRecoilState(submitState)
    const [token,]=useRecoilState(tokenState)
    const [currentPage,]=useRecoilState(currentPageState)
    const [,setCurrentPageData]=useState([])
    const {sideMenu}=useParams();
    const dbURL=process.env.REACT_APP_DATABASE_URL;

    //되긴 한데 이렇게 해도 되나?
    //10개씩 끊어서 나타내기
    const startIndex=(Number(currentPage)-1)*10
    const endIndex=(dataList.length-startIndex)%10===0? 
        Number(currentPage)*10:
            Math.ceil(dataList.length/10)===Number(currentPage)?
                dataList.length:startIndex+10
    const currentData=dataList.slice(startIndex,endIndex)

    currentData.sort(dateAscending)

    //모달창 띄우기
    const onClickApplyItem=(e,key)=>{
        if(e.target.tagName==='INPUT') return
        const clickedData=dataList.filter(el=>el.key===key)
        setShowApplyModal(true)
        setCheckedList(clickedData)
    }

    //input 값 change
    const onChange=(checked,key)=>{
        if(checked){
            const checkedData=dataList.filter(el=>el.key===key)
            setCheckedList([...checkedList,checkedData[0]])
        }else{
            setCheckedList(
                checkedList.filter(el=>el.key!==key)
            )
        }

    }

    //데이터 전처리
    const addObjectKey=(obj,field)=>{
        for(let val in obj){
            //key값 추가
            obj[val]['key']=val   
            //field 추가
            obj[val]['field']=field
        }
        return obj
    }



    //get data from firebase
    // 1. 각각의 데이터 가져오기
    // 2. tab에 따라서 데이터 filter하기
    // 3. 데이터 하나로 합치기
    // 4. 데이터 정렬하기
    const fetchData=useCallback(()=>{
        //데이터 초기화
        //setDataList([])

        if(sideMenu==='all'){

            const fetchCandidates=axios.get(`${dbURL}/Candidates.json?auth=${token}`)
            const fetchApprove=axios.get(`${dbURL}/Approve.json?auth=${token}`)
            const fetchRejections=axios.get(`${dbURL}/Rejections.json?auth=${token}`)
            
            Promise.all([fetchCandidates,fetchApprove,fetchRejections])
            .then(res=>{

                const preData1=addObjectKey(res[0].data,'Candidates')
                const preData2=addObjectKey(res[1].data,'Approve')
                const preData3=addObjectKey(res[2].data,'Rejections')
                
                const data1=Object.values(preData1).filter((el)=>currentTab===el.unit)
                const data2=Object.values(preData2).filter((el)=>currentTab===el.unit)
                const data3=Object.values(preData3).filter((el)=>currentTab===el.unit)

                setDataList([...data1,...data3,...data2])


            })
            .catch(e=>console.log(e))

            
        } else if (sideMenu==='approval'){
            
            axios.get(`${dbURL}/Approve.json?auth=${token}`)
            .then((res)=>{
                const preData=addObjectKey(res.data,'Approve')
                const data=Object.values(preData).filter((fetchDataItem)=>currentTab===fetchDataItem.unit)
                setDataList(data)

            })
            //setCurrentPageData([])
            //console.log(dataList)
            // get(child(dbRef,`/Trees_taken`))
            // .then(res=>{
            //     if(res.exists()){
            //         const preData=addObjectKey(res.val())
            //         const data=Object.values(preData).filter((fetchDataItem)=>currentTab===fetchDataItem.unit)
            //         console.log(data)
            //         setDataList(data)
            //         setCurrentPageData(data)
            //         setColor('#6AD39F')
            //     }
            // })
            // .catch((error)=>console.log(error))

        }else if(sideMenu==='rejection'){
            axios.get(`${dbURL}/Rejections.json?auth=${token}`)
            .then(res=>{
                const preData=addObjectKey(res.data,'Rejections')
                const data=Object.values(preData).filter((fetchDataItem)=>currentTab===fetchDataItem.unit)
                setDataList([...data])
                
            })
            .catch(e=>console.log(e))
        }
        else if (sideMenu==='waiting'){
            axios.get(`${dbURL}/Candidates.json?auth=${token}`)
            .then(res=>{
                const preData=addObjectKey(res.data,'Candidates')
                const data=Object.values(preData).filter((fetchDataItem)=>currentTab===fetchDataItem.unit)
                setDataList([...data])

                
            })
            .catch(e=>console.log(e))


        } else{
            setCurrentPageData([])
        }

    },[sideMenu, dbURL, token, setDataList, currentTab])

    //fetching data when component mounted
    useEffect(()=>{
        //초기화
        setDataList([])
        //fetch
        fetchData()
        setSubmit(false)
        return()=>{
            setChecked(false)
            setCheckedList([])
            setDataList([])
        }
    },[fetchData, setChecked, setCheckedList, setDataList, setSubmit, submit])
    


    return (

            <ApplyListUl>
                {
                    currentData?.map((applyItem)=>(
                       <li 
                        key={applyItem.key} 
                        onClick={(e)=>onClickApplyItem(e,applyItem.key)}
                        >
                           <CheckBox 
                                type="checkbox" 
                                checked={checkedList.includes(applyItem)} 
                                onChange={(e)=>onChange(e.target.checked,applyItem.key)}
                            />
                           <span>
                               <MdCircle 
                                size={24} 
                                color={applyItem.field==='Approve'?'#6AD39F':
                                    applyItem.field==='Candidates'?'#DADADA':'#FFBEB4'
                                }/>
                            </span>
                           <span>{applyItem.name}</span>
                           <span>{applyItem.location}</span>
                           <span>{applyItem.tree_id}</span>
                           <span>{applyItem.tree_type}</span>
                           <span>{applyItem.date}</span>
                       </li>
                    ))
                }
            </ApplyListUl>

    );
};

export default React.memo(ApplyList);