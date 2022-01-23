import React from 'react';
// import arrowDropDown from '../../assets/Main/AdmissionBar/arrow-drop-down.png'
// import arrowForward from '../../assets/Main/AdmissionBar/arrow-forward.png'
// import arrowBack from '../../assets/Main/AdmissionBar/arrow-back.png'
// import refresh from '../../assets/Main/AdmissionBar/refresh.png'

import {MdRefresh,MdOutlineChevronLeft,MdOutlineChevronRight,MdArrowDropDown} from 'react-icons/md'

import {AdmissionBarDiv,AdmissionBarButton,ProcessButton} from './style'
import { useRecoilState } from 'recoil';
import { checkboxState } from '../../../state/checkboxState';
import { dataListState } from '../../../state/dataListState';
import { CheckBox } from '../style';

const AdmissionBar = ({onToggleDropDown}) => {
    const [checked,setChecked]=useRecoilState(checkboxState)
    const [dataList,setDataList]=useRecoilState(dataListState)
    
    const onChange=(e)=>{
        setChecked(!checked)
    }
    const onSubmitApproval=()=>{
        console.log('승인')
    }
    const onSubmitDispproval=()=>{
        console.log('반려')
    }

    return (
        <AdmissionBarDiv>
            <div>
                <CheckBox type="checkbox" onChange={onChange} checked={checked}/>
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