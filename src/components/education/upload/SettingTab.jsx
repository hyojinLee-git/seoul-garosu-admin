import React from 'react';
import {  useRecoilState } from 'recoil';
import { categoryListState } from '../../../state/education/categoryListState';
import {UploadModalBodyWrapper,Wrapper} from './style'

const SettingTab = ({setFile,setFileName,metaData,onChangeMetaData}) => {
    const [categoryList,]=useRecoilState(categoryListState)
    const {category}=metaData
    const onChangeFile=(e)=>{
        const fileName=e.target.value.split("\\");
        setFileName(fileName[fileName.length-1])
        setFile(e.target.files[0])
    }
    return (
        <UploadModalBodyWrapper>
            <div 
                style={{display:"flex",justifyContent:"space-between"}}
            >
                <Wrapper width="48%">
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
                <Wrapper width="48%">
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
                <div style={{display:"flex",marginTop:"10px"}}>
                    <div style={{height:"200px",width:"200px",background:"#C4C4C4",marginRight:"30px"}}>thumbnail</div>
                    <div>
                        <input type="file" required onChange={onChangeFile}/>
                    </div>
                </div>
                
            </Wrapper>
        </UploadModalBodyWrapper>
    );
};

export default SettingTab;