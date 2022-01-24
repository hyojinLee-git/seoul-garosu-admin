import React, { useState } from 'react';
import AdmissionBar from './admissionBar/AdmissionBar';
import ApplyList from './ApplyList';
import ClassificationBar from './classificationBar/ClassificationBar';
import Paging from './pagination/Paging';
import {MainDiv} from './style'
import DropDown from './dropDown/DropDown'
import { useRecoilState } from 'recoil';
import { fetchDataState } from '../../state/fetchDataState';
const Adopt = () => {
    const [showDropDown,setShowDropDown]=useState(false)
    const [currentTab,setCurrentTab]=useState("개인")
    const [dataList,setDataList]=useRecoilState(fetchDataState)

    //개인, 단체, 학교 tab 바꿔주기
    const onChangeTab=(e)=>{
        console.log(e.currentTarget.textContent)
        setDataList([])
        setCurrentTab(e.currentTarget.textContent)
    }

    //dropdown 메뉴 토글
    const onToggleDropDown=()=>{
        setShowDropDown(!showDropDown)
    }

     


    return (
        <MainDiv >
            <form>
                <AdmissionBar onToggleDropDown={onToggleDropDown}/>
                {showDropDown && <DropDown/>}
                <ClassificationBar currentTab={currentTab} onChangeTab={onChangeTab}/>
                <ApplyList currentTab={currentTab}/>
            </form>
            
            <Paging/>
        </MainDiv>
    );
};

export default Adopt;