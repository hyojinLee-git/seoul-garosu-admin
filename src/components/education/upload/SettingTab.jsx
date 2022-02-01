import React from 'react';
import {UploadModalBodyWrapper,Wrapper} from './style'

const SettingTab = ({setFile,setFileName}) => {
    const onChange=(e)=>{
        setFileName(e.target.value)
        setFile(e.target.files[0])
    }
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
                <div style={{display:"flex"}}>
                    <div style={{height:"80%",width:"300px",background:"gray"}}>thumbnail</div>
                    <div>
                        <input type="file" required onChange={onChange}/>
                    </div>
                </div>
                
            </Wrapper>
        </UploadModalBodyWrapper>
    );
};

export default SettingTab;