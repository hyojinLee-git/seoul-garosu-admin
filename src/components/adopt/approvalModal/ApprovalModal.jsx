import React from 'react';
import { useRecoilState } from 'recoil';
import { admissionState } from '../../../state/admissionState';
import { applyModalState } from '../../../state/applyModalState';
import { checkedListState } from '../../../state/checkedListState';
import { submitState } from '../../../state/education/submitState';
import { modalState } from '../../../state/modalState';
import {ApplyModalBG,ApplyModalWrapper} from './style'

const ApprovalModal = () => {
    const [,setShowModal]=useRecoilState(modalState)
    const [checkedList,setCheckedList]=useRecoilState(checkedListState)
    const [admission,]=useRecoilState(admissionState)
    const [,setShowApplyModal]=useRecoilState(applyModalState)
    const[,setSubmit]=useRecoilState(submitState)

    const onCloseModal=()=>{
        setShowModal(false)
        setShowApplyModal(false)
        setCheckedList([])
        setSubmit(true)
    }
    return (
        <ApplyModalBG>
            
            <ApplyModalWrapper color={admission==='승인'?'#6AD39F':admission==='반려'?'#FFBEB4':'#DADADA'}>
                <div>
                    총 {checkedList.length}건이 <br/> <span>{admission}</span> 처리되었습니다.
                </div>
                <button onClick={onCloseModal}>확인</button>
            </ApplyModalWrapper>
        </ApplyModalBG>
    );
};

export default ApprovalModal;