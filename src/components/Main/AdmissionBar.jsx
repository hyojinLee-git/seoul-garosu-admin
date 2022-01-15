import React from 'react';
import arrowDropDown from '../../assets/Main/AdmissionBar/arrow-drop-down.png'
import arrowForward from '../../assets/Main/AdmissionBar/arrow-forward.png'
import arrowBack from '../../assets/Main/AdmissionBar/arrow-back.png'
import refresh from '../../assets/Main/AdmissionBar/refresh.png'
import {AdmissionBarDiv,CheckBox,AdmissionBarButton,ProcessButton} from './style'
const AdmissionBar = ({onClickDropDown}) => {
    return (
        <AdmissionBarDiv>
            <div>
                <CheckBox type="checkbox" />
                <AdmissionBarButton onClick={onClickDropDown}>
                    <img src={arrowDropDown} alt="dropdown-button"/>
                </AdmissionBarButton>
            </div>
            <div>
                {/* 제출부분인가 */}
                <ProcessButton className={"admission-btn"} color="#6AD39F">승인</ProcessButton>
                <ProcessButton className={"admission-btn"} color="#FF7E6B">반려</ProcessButton>
                <ProcessButton className={"admission-btn"} color="#DADADA">대기</ProcessButton>
            </div>
            <div>
                <AdmissionBarButton>
                    <img src={refresh} alt="refresh"/>
                </AdmissionBarButton>
                <AdmissionBarButton>
                    <img src={arrowBack} alt="arrow-back"/>
                </AdmissionBarButton>
                <AdmissionBarButton>
                    <img src={arrowForward} alt="arrow-forward"/>
                </AdmissionBarButton>
            </div>
        </AdmissionBarDiv>
    );
};

export default AdmissionBar;