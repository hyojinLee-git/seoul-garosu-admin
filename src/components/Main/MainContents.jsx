import React, { useState } from 'react';
import AdmissionBar from './AdmissionBar';
import ApplyList from './ApplyList';
import ClassificationBar from './ClassificationBar';
import DropDown from './DropDown';
import Pagination from './Pagination';
import {MainDiv} from './style'

const MainContents = () => {
    const [showDropDown,setShowDropDown]=useState(false)
    const onClickDropDown=()=>{
        setShowDropDown(prev=>!prev)
    }
    return (
        <MainDiv >
            <AdmissionBar onClickDropDown={onClickDropDown}/>
            { showDropDown&& <DropDown/>}
            <ClassificationBar/>
            <ApplyList/>
            <Pagination/>
        </MainDiv>
    );
};

export default MainContents;