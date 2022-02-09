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



const Education = () => {
    const dbURL=process.env.REACT_APP_DATABASE_URL;
    const [currentTab,setCurrentTab]=useState('업로드 날짜')
    const [token,]=useRecoilState(tokenState)
    const [,setShowUploadModal]=useRecoilState(uploadModalState)
    const [,setCategoryList]=useRecoilState(categoryListState)
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
            const color=temp.filter(el=>typeof el==='string')
            for(let j=0;j<temp.length;j++){
                if(typeof temp[j]==='string') continue
                convertedData.push({
                    ...temp[j],
                    category:categoryList[i],
                    color:color[0]
                })
            }
        }
        return convertedData
    }

    const addColor=useCallback((obj)=>{
        const categoryList=[]
        for(let val in obj){
            categoryList.push({title:val,color:obj[val]['color']})
        }
        return categoryList
    },[])

    //fetch data
    const fetchEducationData=useCallback(async()=>{
        try{
            const res=await axios.get(`${dbURL}/Educations.json?auth=${token}`)
            const convertedData=convertData(Object.values(res.data),Object.keys(res.data))
            setEducationList(convertedData)

        }catch(e){
            console.log(e)
        }
    },[dbURL, setEducationList, token])

    //fetch category data
    const fetchCategoryData=useCallback(async ()=>{
        try{
            const res=await axios.get(`${dbURL}/Educations.json?auth=${token}`)
            const preData=addColor(res.data)
            setCategoryList(preData)
        }catch(e){
            console.log(e)
        }

        
    },[addColor, dbURL, setCategoryList, token])


    useEffect(()=>{
        fetchCategoryData()
        fetchEducationData()

    },[fetchCategoryData, fetchEducationData])

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