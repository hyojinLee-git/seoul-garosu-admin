import React from 'react';
import {  useRecoilState } from 'recoil';
import { categoryListState } from '../../../state/education/categoryListState';
import {UploadModalBodyWrapper,Wrapper} from './style'

const SettingTab = ({setFile,setFileName,metaData,onChangeMetaData}) => {
    //const categoryList=['식물관리','병해충 관리','가드닝','식물이해']
    const [categoryList,]=useRecoilState(categoryListState)
    const {category}=metaData
    const onChangeFile=(e)=>{
        setFileName(e.target.value)
        setFile(e.target.files[0])
    }
    return (
        <UploadModalBodyWrapper>
            <div style={{display:"flex",justifyContent:"space-between"}}>
                <Wrapper width="48%" height="30%">
                    <label>카테고리</label>
                    <br/>
                    <select name="category" value={category} onChange={onChangeMetaData}>
                        {
                            categoryList?.map(el=>(
                                <option key={el} value={el}>{el}</option>
                            ))
                        }
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
                    <div style={{height:"200px",width:"200px",background:"#C4C4C4"}}>thumbnail</div>
                    <div>
                        <input type="file" required onChange={onChangeFile}/>
                    </div>
                </div>
                
            </Wrapper>
        </UploadModalBodyWrapper>
    );
};

export default SettingTab;