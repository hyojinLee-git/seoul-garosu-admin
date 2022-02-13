import React, { useEffect, useState } from 'react';
import AdmissionBar from './admissionBar/AdmissionBar';
import ApplyList from './ApplyList';
import ClassificationBar from './classificationBar/ClassificationBar';
import Paging from './pagination/Paging';
import {MainDiv} from './style'
//import DropDown from './dropDown/DropDown'
import { useRecoilState } from 'recoil';
import { fetchDataState } from '../../state/fetchDataState';
import { currentPageState } from '../../state/currentPageState';


const Adopt = () => {
    const [showDropDown,setShowDropDown]=useState(false)
    const [currentTab,setCurrentTab]=useState("개인")
    const [dataList,setDataList]=useRecoilState(fetchDataState)
    const [,setCurrentPage]=useRecoilState(currentPageState)
    //개인, 단체, 학교 tab 바꿔주기
    const onChangeTab=(e)=>{
        setDataList([])
        setCurrentTab(e.currentTarget.textContent)
    }

    //dropdown 메뉴 토글
    const onToggleDropDown=()=>{
        setShowDropDown(!showDropDown)
    }
    useEffect(()=>{
        return()=>{
            setCurrentPage(1)
        }
    },[setCurrentPage])
    return (
        <MainDiv >
            <form>
                <AdmissionBar onToggleDropDown={onToggleDropDown}/>
                {/* {showDropDown && <DropDown/>} */}
                <ClassificationBar currentTab={currentTab} onChangeTab={onChangeTab}/>
                <ApplyList currentTab={currentTab}/>
            </form>
            <Paging     
                totalItemsCount={dataList.length} 
                itemsCountPerPage={10} 
                pageRangeDisplayed={10}
                //currentPageState={currentPageState}
            />
        </MainDiv>
    );
};

export default Adopt;