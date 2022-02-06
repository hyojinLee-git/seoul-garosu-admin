import React,{useCallback, useEffect, useState} from 'react';
import {EducationContainer,ControlBar,Button,} from './style'
import { useRecoilState } from 'recoil';
import { uploadModalState } from '../../state/education/uploadModalState';
import axios from 'axios';
import { tokenState } from '../../state/tokenState';
import { categoryListState } from '../../state/education/categoryListState';
import DateContent from './dateContent/DateContent';
import CategoryContent from './categoryContent/CategoryContent';
import { educationListState } from '../../state/education/educationListState';

const colorChart=['#E2E1E1','#F9C3C3','#F7D1C6','#F9E5C4','#FCF2C7','#DFECBB','#BEDACD','#D8F5F4','#B8EAE7','#B5C7ED','#D1CEF6','#E1C4EE','#FDDDF9','#FAC5E0','#FED5D7','#C5C5C5']

const Education = () => {
    const dbURL=process.env.REACT_APP_DATABASE_URL;
    const [,setShowUploadModal]=useRecoilState(uploadModalState)
    const [currentTab,setCurrentTab]=useState('업로드 날짜')
    
    const [token,]=useRecoilState(tokenState)
    const [,setCategoryList]=useRecoilState(categoryListState)
    //전역으로 그닥??
    const [,setEducationList]=useRecoilState(educationListState)


    const onChangeTab=(e)=>{
        setCurrentTab(e.target.innerText)
    }

    const showUploadModal=()=>{
        setShowUploadModal(true)
    }

    const convertData=(dataList,categoryList)=>{
        const convertedData=[]
        for(let i=0;i<dataList.length;i++){
            const temp=[]
            temp.push(...Object.values(dataList[i]))
            for(let j=0;j<temp.length;j++){
                convertedData.push({
                    ...temp[j],
                    category:categoryList[i]
                })
            }
            
        }
        console.log(convertedData)
        return convertedData
    }

    const addColor=useCallback((categoryList)=>{
        const data=categoryList.map(el=>({title:el,color:colorChart[Math.floor(Math.random()*colorChart.length)]}))
        return data
    },[])

    useEffect(()=>{
        //get category list
        axios.get(`${dbURL}/Educations.json?auth=${token}`)
        .then(res=>{
            const preData=addColor(Object.keys(res.data))
            setCategoryList(preData)
        })
        .catch(e=>console.log(e))
    },[addColor, dbURL, setCategoryList, token])


    useEffect(()=>{
        //get education list
        axios.get(`${dbURL}/Educations.json?auth=${token}`)
        .then(res=>{
            const convertedData=convertData(Object.values(res.data),Object.keys(res.data))
            setEducationList(convertedData)
        })
        .catch(e=>console.log(e))
    },[dbURL, setEducationList, token])

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
            { currentTab==='업로드 날짜' && 
                <>
                    <DateContent currentCategory={''}/>
                    
                </>
            }
            { currentTab==='카테고리' && <CategoryContent />}


        </EducationContainer>
    );
};

export default Education;