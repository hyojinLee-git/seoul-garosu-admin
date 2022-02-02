import React from 'react';
import {UploadModalBodyWrapper,Wrapper} from './style'

const InfoTab = ({metaData,onChangeMetaData}) => {
    const {title,description}=metaData
    return (
        <UploadModalBodyWrapper>
            <Wrapper height="30%">
                <label>
                    제목
                </label>
                <br/>
                <textarea name="title" value={title} onChange={onChangeMetaData} placeholder='해당 컨텐츠의 제목을 입력해주세요 '/>
            </Wrapper>

            <Wrapper height="60%">
                <label>
                    내용
                </label>
                <br/>
                <textarea name="description" value={description} onChange={onChangeMetaData} placeholder='컨텐츠 시청자에게 교육 내용에 대해 알려주세요 '/>
            </Wrapper>
            
        </UploadModalBodyWrapper>
    );
};

export default InfoTab;