import React from 'react';
import ApplyListModalContents from './ApplyModalContents';
import { ApplyModalDiv } from './css/style';
import { applyModalState} from '../../../state/applyModalState'
import { useRecoilState } from 'recoil';

const ApplyModal = () => {
    const [showApplyModal,setShowApplyModal]=useRecoilState(applyModalState)
    const onCloseApplyModal=(e)=>{
        e.stopPropagation()
        setShowApplyModal(false)
    }
    return (
        <ApplyModalDiv onClick={(e)=>onCloseApplyModal(e)}>
            <ApplyListModalContents/>
        </ApplyModalDiv>

    );
};

export default React.memo(ApplyModal);