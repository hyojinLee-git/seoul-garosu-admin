import React,{useEffect, useState} from 'react';
import {EducationContainer,ControlBar,Button,} from './style'

import { useRecoilState } from 'recoil';
import { uploadModalState } from '../../state/education/uploadModalState';
import axios from 'axios';
import { tokenState } from '../../state/tokenState';
import { categoryListState } from '../../state/education/categoryListState';
import DateContent from './dateContent/DateContent';
import CategoryContent from './categoryContent/CategoryContent';


const Education = () => {
    const dbURL=process.env.REACT_APP_DATABASE_URL;
    const [,setShowUploadModal]=useRecoilState(uploadModalState)
    const [currentTab,setCurrentTab]=useState('업로드 날짜')
    
    const [token,]=useRecoilState(tokenState)
    const [categoryList,setCategoryList]=useRecoilState(categoryListState)

    const onChangeTab=(e)=>{
        setCurrentTab(e.target.innerText)
    }

    const showUploadModal=()=>{
        setShowUploadModal(true)
    }

    useEffect(()=>{
        axios.get(`${dbURL}/Educations.json?auth=${token}`)
        .then(res=>{
            setCategoryList(Object.keys(res.data))
        })
        .catch(e=>console.log(e))
    },[dbURL, setCategoryList, token])

    return (
        <EducationContainer>
            <h2>교육 관리</h2>
            <ControlBar>
                <div>
                    <Button 
                        bgColor="white" 
                        border="3px solid" 
                        width="180px" 
                        className={currentTab==='업로드 날짜'?'active':''}
                        onClick={onChangeTab}
                    >
                        업로드 날짜
                    </Button>
                    <Button 
                        bgColor="white" 
                        border="3px solid"
                        className={currentTab==='카테고리'?'active':''}
                        onClick={onChangeTab}
                    >
                        카테고리
                    </Button>
                </div>
                <Button bgColor="#669AFF" borderRadius="5px" color='white'  onClick={showUploadModal}>
                    추가하기
                </Button>
            </ControlBar>
            { currentTab==='업로드 날짜' && <DateContent/>}
            { currentTab==='카테고리' && <CategoryContent/>}
            

        </EducationContainer>
    );
};

export default Education;