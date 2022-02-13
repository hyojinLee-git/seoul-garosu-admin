import React,{useCallback, useEffect, useState} from 'react';
import {EducationContainer,ControlBar,Button,} from './style'
import { useRecoilState } from 'recoil';
import { uploadModalState } from '../../state/education/uploadModalState';
import { categoryListState } from '../../state/education/categoryListState';
import DateContent from './dateContent/DateContent';
import CategoryContent from './categoryContent/CategoryContent';
import { educationListState } from '../../state/education/educationListState';
import {get,ref as refDatabase,getDatabase, child} from 'firebase/database'
import { submitState } from '../../state/education/submitState';
//import { getStorage,ref as refStorage,getDownloadURL } from 'firebase/storage';

const Education = () => {
    const [currentTab,setCurrentTab]=useState('업로드 날짜')
    const [,setShowUploadModal]=useRecoilState(uploadModalState)
    const [,setCategoryList]=useRecoilState(categoryListState)
    const [,setEducationList]=useRecoilState(educationListState)
    const [submit,setSubmit]=useRecoilState(submitState)
    const dbRef=refDatabase(getDatabase())


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
                    color:color[0],
                    key:Object.keys(dataList[i])[j],
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
            const res=await get(child(dbRef,`/Educations`))
            const convertedData=convertData(Object.values(res.val()),Object.keys(res.val()))
            setEducationList(convertedData)

        }catch(e){
            console.log(e)
        }
    },[dbRef, setEducationList])

    //fetch category data
    const fetchCategoryData=useCallback(async ()=>{
        try{
            const res=await get(child(dbRef,`/Educations`))
            const preData=addColor(res.val())
            setCategoryList(preData)
        }catch(e){
            console.log(e)
        }

        
    },[addColor, dbRef, setCategoryList])


    useEffect(()=>{
        fetchCategoryData()
        fetchEducationData()
        setSubmit(false)
    },[fetchCategoryData, fetchEducationData, setSubmit, submit])

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