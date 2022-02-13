import React from 'react';
import ApplyListModalContents from './ApplyModalContents';
import { ApplyModalDiv } from './css/style';
import { applyModalState} from '../../../state/applyModalState'
import { useRecoilState } from 'recoil';

const ApplyModal = () => {
    const [,setShowApplyModal]=useRecoilState(applyModalState)


    const onCloseApplyModal=(e)=>{
        if(!e.target.classList.contains('bg'))return
        setShowApplyModal(false)
    }
    return (
        <ApplyModalDiv className='bg' onClick={(e)=>onCloseApplyModal(e)}>
            <ApplyListModalContents onCloseApplyModal={onCloseApplyModal}/>
        </ApplyModalDiv>

    );
};

export default React.memo(ApplyModal);