import React from 'react';
import { useRecoilState } from 'recoil';
import { admissionState } from '../../../state/admissionState';
import { checkedListState } from '../../../state/checkedListState';
import { modalState } from '../../../state/modalState';
import {ApplyModalBG,ApplyModalWrapper} from './style'

const ApprovalModal = () => {
    const [,setShowModal]=useRecoilState(modalState)
    const [checkedList,setCheckedList]=useRecoilState(checkedListState)
    const [admission,]=useRecoilState(admissionState)

    const onCloseModal=()=>{
        setShowModal(false)
        setCheckedList([])
    }
    return (
        <ApplyModalBG>
            
            <ApplyModalWrapper color={admission==='승인'?'#6AD39F':'#FFBEB4'}>
                <div>
                    총 {checkedList.length}건이 <br/> <span>{admission}</span> 처리되었습니다.
                </div>
                <button onClick={onCloseModal}>확인</button>
            </ApplyModalWrapper>
        </ApplyModalBG>
    );
};

export default ApprovalModal;