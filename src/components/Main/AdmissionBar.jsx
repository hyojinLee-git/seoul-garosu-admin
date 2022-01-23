import React from 'react';
import arrowDropDown from '../../assets/Main/AdmissionBar/arrow-drop-down.png'
import arrowForward from '../../assets/Main/AdmissionBar/arrow-forward.png'
import arrowBack from '../../assets/Main/AdmissionBar/arrow-back.png'
import refresh from '../../assets/Main/AdmissionBar/refresh.png'
import {AdmissionBarDiv,CheckBox,AdmissionBarButton,ProcessButton} from './style'
import { useRecoilState } from 'recoil';
import { checkboxState } from '../../state/checkboxState';
import { dataListState } from '../../state/dataListState';
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
                    <img src={arrowDropDown} alt="dropdown-button"/>
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
                    <img src={refresh} alt="refresh"/>
                </AdmissionBarButton>
                <AdmissionBarButton type='button'>
                    <img src={arrowBack} alt="arrow-back"/>
                </AdmissionBarButton>
                <AdmissionBarButton type='button'>
                    <img src={arrowForward} alt="arrow-forward"/>
                </AdmissionBarButton>
            </div>
        </AdmissionBarDiv>
    );
};

export default AdmissionBar;