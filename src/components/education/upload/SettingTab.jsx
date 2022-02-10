import React from 'react';
import {  useRecoilState } from 'recoil';
import { categoryListState } from '../../../state/education/categoryListState';
import {UploadModalBodyWrapper,Wrapper,Label} from './style'
import { getThumbnail } from '../../../utils/getThumbnail';

const SettingTab = ({setFile,setFileName,metaData,onChangeMetaData}) => {
    const [categoryList,]=useRecoilState(categoryListState)
    const {category}=metaData
    
    const onChangeFile=(e)=>{
        const fileName=e.target.value.split("\\");
        setFileName(fileName[fileName.length-1])
        setFile(e.target.files[0])
        getThumbnail(e.target.files[0])
    }

    return (
        <UploadModalBodyWrapper>
            <Wrapper>
                <label>카테고리</label>
                <br/>
                <select 
                    name="category" 
                    value={category} 
                    onChange={onChangeMetaData}
                >
                    {
                        categoryList?.map(el=>(
                            <option key={el.title} value={el.title}>{el.title}</option>
                        ))
                    }
                </select>
            </Wrapper>
            <Wrapper height="75%">
                <label>미리보기 이미지</label>
                <div className='meta'>
                    시청자들에게 보이는 미리보기 이미지를 설정해주세요
                </div>
                <div 
                    style={{display:"flex",marginTop:"20px", height:"200px",boxSizing:"border-box"}}
                >
                    <div className='input-wrapper'>
                        <Label className='input-file-btn' htmlFor='input-file'>
                            내 파일에서 업로드
                        </Label>
                        <input 
                            id='input-file' 
                            type="file" 
                            required 
                            onChange={onChangeFile}
                            accept=".jpg,.jpeg.,.gif,.png,.mov,.mp4"
                        />
                    </div>
                    <div id="thumbnail"></div>
                </div>
                
            </Wrapper>
        </UploadModalBodyWrapper>
    );
};

export default SettingTab;