import React from 'react';
import arrowDropDown from '../../assets/Main/AdmissionBar/arrow-drop-down.png'
import arrowForward from '../../assets/Main/AdmissionBar/arrow-forward.png'
import arrowBack from '../../assets/Main/AdmissionBar/arrow-back.png'
import refresh from '../../assets/Main/AdmissionBar/refresh.png'
import {AdmissionBarDiv,ProcessButton,CheckBox} from './style'
const AdmissionBar = ({onClickDropDown}) => {
    return (
        <AdmissionBarDiv>
            <div>
                <CheckBox type="checkbox" />
                <button onClick={onClickDropDown}>
                    <img src={arrowDropDown} alt="dropdown-button"/>
                </button>
            </div>
            <div>
                {/* 제출부분인가 */}
                <ProcessButton color="#6AD39F">승인</ProcessButton>
                <ProcessButton color="#FF7E6B">반려</ProcessButton>
                <ProcessButton color="#DADADA">대기</ProcessButton>
            </div>
            <div>
                <button>
                    <img src={refresh} alt="refresh"/>
                </button>
                <button>
                    <img src={arrowBack} alt="arrow-back"/>
                </button>
                <button>
                    <img src={arrowForward} alt="arrow-forward"/>
                </button>
            </div>
        </AdmissionBarDiv>
    );
};

export default AdmissionBar;