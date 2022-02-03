import React from 'react';
import {MdCreate,MdOutlineDelete} from 'react-icons/md'
import {DropDownWrapper} from './style'
const DropDown = ({dropDownPosition,setIsDeleteMode,setShowDropDown}) => {

    const setModifyMode=()=>{
        setIsDeleteMode(false)
        setShowDropDown(false)
    }

    const setDeleteMode=()=>{
        setIsDeleteMode(true)
        setShowDropDown(false)
    }

    return (
        <DropDownWrapper position={`${dropDownPosition}px`}>
            <button onClick={setModifyMode}>
                <MdCreate/>
                수정하기
            </button>
            <button onClick={setDeleteMode}>
                <MdOutlineDelete/>
                삭제하기
            </button>
        </DropDownWrapper>
    );
};

export default DropDown;