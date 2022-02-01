import React from 'react';
import { useRecoilState } from 'recoil';
import { uploadModalState } from '../../../state/education/uploadModalState';
import {UploadModalContainer} from './style'
import UploadModalContents from './UploadModalContents';

const UploadModal = () => {
    const [,setShowUploadModal]=useRecoilState(uploadModalState)
    const onCloseModal=(e)=>{
        if (e.target.classList.contains('bg')){
            setShowUploadModal(false)
        }
    }
    return (
        <UploadModalContainer className='bg' onClick={(e)=>onCloseModal(e)}>
            <UploadModalContents/>
        </UploadModalContainer>
    );
};

export default React.memo(UploadModal);