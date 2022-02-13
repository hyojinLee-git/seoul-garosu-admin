import React, { useEffect } from 'react';
import {ApplyModalContentsWrapper,ApplyModalContentsHeader,ApplyModalContentsBody,ApplyModalContentsMeta,Button} from './css/style'
import { applyModalState} from '../../../state/applyModalState'
import {  useRecoilState } from 'recoil';
import {MdClear} from 'react-icons/md'
import { modalState } from '../../../state/modalState';
import { admissionState } from '../../../state/admissionState';
import { tokenState } from '../../../state/tokenState';
import { checkedListState } from '../../../state/checkedListState';
import {onSubmitApproval, onSubmitRejection } from '../../../utils/submitFunction';

const ApplyModalContents = () => {
    const [,setShowApplyModal]=useRecoilState(applyModalState)
    const[checkedList,setCheckedList]=useRecoilState(checkedListState)
    const [token]=useRecoilState(tokenState)
    const [,setShowModal]=useRecoilState(modalState)
    const [,setAdmission]=useRecoilState(admissionState)
    const {name, date,location, tree_location, tree_type,motive}=checkedList?.[0]
    
    //close modal
    const closeApplyModal=()=>{
        setShowApplyModal(false)
    }

    useEffect(()=>{
 
        return()=>{
            setCheckedList([])
        }

    },[ setCheckedList])
    
    
    return (
        <ApplyModalContentsWrapper>
            <ApplyModalContentsHeader>
                <h1>입양 신청서</h1>
                <button onClick={closeApplyModal}>
                    <MdClear size={35} color='rgba(0, 0, 0, 0.54)'/>
                </button>
            </ApplyModalContentsHeader>
            

            <ApplyModalContentsMeta>
                <div>
                    {name},{location},{date}
                </div>
                <div>
                    <Button 
                        color='#6AD39F' 
                        onClick={()=>onSubmitApproval(  
                        checkedList,
                        setCheckedList,
                        token,
                        setAdmission,
                        setShowModal,)}>
                            승인
                    </Button>
                    <Button 
                        color='#FFBEB4' 
                        onClick={()=>onSubmitRejection(  
                            checkedList,
                            setCheckedList,
                            token,
                            setShowModal,
                            setAdmission,)}>
                                반려
                    </Button>
                </div>
            </ApplyModalContentsMeta>
            <ApplyModalContentsBody>
                <h3>입양정보</h3>
                <div>
                    {tree_location} {tree_type}
                </div>
                <div>
                    <h3>지원동기</h3>
                    <p>
                        {motive}
                    </p>
                </div>
            
        </ApplyModalContentsBody>
        </ApplyModalContentsWrapper>
    );
};

export default React.memo(ApplyModalContents);