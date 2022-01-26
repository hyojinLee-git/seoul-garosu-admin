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
import { useLocation, useParams } from 'react-router-dom';


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
    const [currentPageData,setCurrentPageData]=useState([])
    const params=useParams()
    const location=useLocation()
    //<해결해야 할 과제>
    //색깔 대충 설정함
    //firebase함수 걷어내기
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
        //데이터 초기화
        //setDataList([])

        //dataList는 가져온 전체 데이터(전역), pageData는 현재 페이지 데이터(지역)
        if(menu==='전체 입양신청'){
            setColor('DADADA')
            setCurrentPageData([])
            const promise1=axios.get(`${dbURL}/Candidates.json?auth=${token}`)
            const promise2=axios.get(`${dbURL}/Trees_taken.json?auth=${token}`)
            Promise.all([promise1,promise2])
            .then(res=>{
                // 1. 각각의 링크에서 데이터 가져오기
                // 2. tab에 따라서 데이터 filter하기
                // 3. 데이터 하나로 합치기
                // 4. 데이터 정렬하기
                // 5. 데이터 11개씩 끊어서 보여주기(:page로 계산 가져오기)(for문?)
                const preData1=addField(addObjectKey(res[0].data),'Candidates')
                const preData2=addField(addObjectKey(res[1].data),'Trees_taken')
                const data1=Object.values(preData1).filter((el)=>currentTab===el.unit)
                const data2=Object.values(preData2).filter((el)=>currentTab===el.unit)
                setDataList([...data1,...data2])
                const data=[]
                //처음 렌더링될때 안되는중ㅠ
                
                //0~10
                //10~20
                console.log(params,location)
                const startIndex=(Number(params.page)-1)*10
                const endIndex=parseInt(dataList.length/10)*10
                console.log(startIndex,endIndex)
                for (let i=startIndex;i<endIndex;i++){
                    data.push(dataList[i])
                }
                setCurrentPageData([...data])
                console.log(currentPageData)
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
                    setCurrentPageData(data)
                    setColor('#6AD39F')
                }
            })
            .catch((error)=>console.log(error))
        }else if(menu==='반려한 입양신청'){
            setCurrentPageData([])
        }
        else if (menu==='대기중인 입양신청'){
            axios.get(`${dbURL}/Candidates.json?auth=${token}`)
            .then(res=>{
                const preData=addObjectKey(res.data)
                const data=Object.values(preData).filter((fetchDataItem)=>currentTab===fetchDataItem.unit)
                setCurrentPageData(data)
                //console.log(res.data)
                setColor('#DADADA')
            })
            .catch(e=>console.log(e))


        } else{
            setCurrentPageData([])
        }
    },[currentTab, dbURL, menu, setDataList, token,params])

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
                    currentPageData?.map((applyItem)=>(
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
                               <MdCircle size={24} color={applyItem.field==='Trees_taken'?'#6AD39F':color}/>
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