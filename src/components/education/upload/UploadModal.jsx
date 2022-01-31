import React from 'react';
import {UploadModalContainer} from './style'
import UploadModalContents from './UploadModalContents';

const UploadModal = () => {
    const onCloseModal=(e)=>{

    }
    return (
        <UploadModalContainer className='bg' onClick={(e)=>onCloseModal(e)}>
            <UploadModalContents/>
        </UploadModalContainer>
    );
};

export default React.memo(UploadModal);