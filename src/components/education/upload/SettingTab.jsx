import React from 'react';
import {UploadModalBodyWrapper,Wrapper} from './style'

const SettingTab = () => {
    return (
        <UploadModalBodyWrapper>
            <div style={{display:"flex",justifyContent:"space-between"}}>
                <Wrapper width="48%" height="30%">
                    <label>카테고리</label>
                    <br/>
                    <select>
                        <option>식물관리</option>
                        <option>식물관리</option>
                        <option>식물관리</option>
                        <option>식물관리</option>
                    </select>
                </Wrapper>
                <Wrapper width="48%" height="30%">
                    <label>회차정보</label>
                    <br/>
                    <select>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                    </select>
                </Wrapper>
            </div>

            <Wrapper height="65%">
                <label>미리보기 이미지</label>
            </Wrapper>
        </UploadModalBodyWrapper>
    );
};

export default SettingTab;