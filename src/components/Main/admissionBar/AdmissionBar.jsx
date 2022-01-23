import React, { useEffect, useState } from 'react';

import {MdRefresh,MdOutlineChevronLeft,MdOutlineChevronRight,MdArrowDropDown} from 'react-icons/md'
import { checkboxState } from '../../../state/checkboxState';
import {AdmissionBarDiv,AdmissionBarButton,ProcessButton} from './style'
import { useRecoilState } from 'recoil';
import { fetchDataState } from '../../../state/fetchDataState';
import { CheckBox } from '../style';
import { checkedListState } from '../../../state/checkedListState';

const AdmissionBar = ({onToggleDropDown}) => {
    const [checked,setChecked]=useRecoilState(checkboxState)
    //const [checked,setChecked]=useState(false)
    const [dataList,setDataList]=useRecoilState(fetchDataState)
    const [checkedList,setCheckedList]=useRecoilState(checkedListState)
    
    const onChange=()=>{
        setChecked(!checked)
    }
    const onSubmitApproval=()=>{
        console.log('승인')
        
    }
    const onSubmitDispproval=()=>{
        console.log('반려')
    }

    useEffect(()=>{
        if (checked){
            setCheckedList(dataList)
        }else{
            setCheckedList([])
        }
    },[checked, dataList, setCheckedList])

    useEffect(()=>{
        if(dataList.length===checkedList.length){
            setChecked(true)
        }
    },[checkedList.length, dataList.length, setChecked])

    return (
        <AdmissionBarDiv>
            <div>
                <CheckBox 
                    type="checkbox" 
                    onChange={onChange}
                    //onChange={(e)=>onChange(e.target.checked)} 
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
                <AdmissionBarButton type='button'>
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

export default AdmissionBar;