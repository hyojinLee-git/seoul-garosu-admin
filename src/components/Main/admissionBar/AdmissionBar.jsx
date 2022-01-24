import React, { useEffect, useState } from 'react';
import axios from 'axios'
import {MdRefresh,MdOutlineChevronLeft,MdOutlineChevronRight,MdArrowDropDown} from 'react-icons/md'
import { checkboxState } from '../../../state/checkboxState';
import {AdmissionBarDiv,AdmissionBarButton,ProcessButton} from './style'
import { useRecoilState } from 'recoil';
import { fetchDataState } from '../../../state/fetchDataState';
import { CheckBox } from '../style';
import { checkedListState } from '../../../state/checkedListState';
import {getDatabase,ref,push,child,update,remove} from 'firebase/database'

const AdmissionBar = ({onToggleDropDown}) => {
    const [checked,setChecked]=useRecoilState(checkboxState)
    const [dataList,setDataList]=useRecoilState(fetchDataState)
    const [checkedList,setCheckedList]=useRecoilState(checkedListState)

    const db=getDatabase();
    
    const onChange=()=>{
        setChecked(!checked)
    }
    //승인버튼
    const onSubmitApproval=()=>{
        if(checkedList.length===0) {
            alert('선택한 신청이 없습니다.')
            return
        }
        for (let i=0;i<checkedList.length;i++){
            const newPostKey=push(child(ref(db),'posts')).key
            const updates={}
            updates[`Trees_taken/${newPostKey}`]=checkedList[i]
            update(ref(db),updates).catch(e=>console.log(e))
        }
        const updates={}
        updates[`Candidates/${dataList[0].key}`]=null
        update(ref(db),updates)
        setCheckedList([])
    }
    //반려버튼
    const onSubmitDispproval=async ()=>{
        console.log('반려')
        console.log(checkedList)


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