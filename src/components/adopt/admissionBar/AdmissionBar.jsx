import React, { useEffect, useState } from 'react';
import axios from 'axios'
import {MdRefresh,MdOutlineChevronLeft,MdOutlineChevronRight,MdArrowDropDown} from 'react-icons/md'
import { checkboxState } from '../../../state/checkboxState';
import {AdmissionBarDiv,AdmissionBarButton,ProcessButton} from './style'
import { useRecoilState } from 'recoil';
import { fetchDataState } from '../../../state/fetchDataState';
import { CheckBox } from '../style';
import { checkedListState } from '../../../state/checkedListState';
import { tokenState } from '../../../state/tokenState';

const AdmissionBar = ({onToggleDropDown}) => {
    const [checked,setChecked]=useRecoilState(checkboxState)
    const [dataList,setDataList]=useRecoilState(fetchDataState)
    const [checkedList,setCheckedList]=useRecoilState(checkedListState)
    //생각해보니 tokenState로 써도 될듯
    const [token]=useRecoilState(tokenState)
    const dbURL=process.env.REACT_APP_DATABASE_URL;
    
    
    const onChange=()=>{
        setChecked(!checked)
    }
    //승인버튼
    const onSubmitApproval=()=>{
        if(checkedList.length===0) {
            alert('선택한 신청이 없습니다.')
            return
        }
        //승인or 반려 테이블의 데이터 있으면 return
        
        console.log(checkedList)
        
        checkedList.forEach(checkedListItem=>{
            axios.post(`${dbURL}/Trees_taken.json?auth=${token}`,checkedListItem)
            .then(res=>console.log(res))
            .catch(e=>console.log(e))
            
        })



    }
    //반려버튼
    const onSubmitDispproval=async ()=>{
        console.log('반려')
        console.log(checkedList)
        // try{
        //     await axios.post(`https://garosero-70ff7-default-rtdb.firebaseio.com/Candidates.json?auth=${token}`,checkedList[0])
        // }catch(e){
        //     console.log(e)
        // }

    }
    
    const onRefresh=()=>{
        window.location.reload()
    }

    useEffect(()=>{
        if (checked){
            setCheckedList(dataList)
        }else{
            setCheckedList([])
        }

    },[checked, dataList, setCheckedList])

    useEffect(()=>{
        if(dataList.length===checkedList.length&&dataList.length!==0 && checkedList.length!==0){
            setChecked(true)
        }

    },[checkedList.length, dataList.length, setChecked])

    return (
        <AdmissionBarDiv>
            <div>
                <CheckBox 
                    type="checkbox" 
                    onChange={onChange}
                    checked={checkedList.length===dataList.length}
                />
                <AdmissionBarButton onClick={onToggleDropDown} type='button'> 
                    <MdArrowDropDown size={18}/>
                </AdmissionBarButton>
            </div>
            <div>
                {/* 제출부분인가 */}
                <ProcessButton onClick={onSubmitApproval}  type='button' className={"admission-btn"} color="#6AD39F">승인</ProcessButton>
                <ProcessButton onClick={onSubmitDispproval}  type='button' className={"admission-btn"} color="#FF7E6B">반려</ProcessButton>
                <ProcessButton type='button' className={"admission-btn"} color="#DADADA">대기</ProcessButton>
            </div>
            <div>
                <AdmissionBarButton type='button' onClick={onRefresh}>
                    <MdRefresh size={24} color='rgba(0, 0, 0, 0.54)'/>
                </AdmissionBarButton>
                <AdmissionBarButton type='button'>
                    <MdOutlineChevronLeft size={24} color='rgba(0, 0, 0, 0.54)'/>
                </AdmissionBarButton>
                <AdmissionBarButton type='button'>
                    <MdOutlineChevronRight size={24} color='rgba(0, 0, 0, 0.54)'/>
                </AdmissionBarButton>
            </div>
        </AdmissionBarDiv>
    );
};

export default React.memo(AdmissionBar);