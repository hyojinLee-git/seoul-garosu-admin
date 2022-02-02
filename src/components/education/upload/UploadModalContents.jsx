import React, { useCallback, useEffect, useState } from 'react';
import {MdClear} from 'react-icons/md'
import {UploadModalContentsWrapper,UploadModalContentsHeader} from './style'
import InfoTab from './InfoTab';
import SettingTab from './SettingTab';
import { useRecoilState } from 'recoil';
import { uploadModalState } from '../../../state/education/uploadModalState';
import ControlBar from './ControlBar';
import {getStorage, ref, uploadBytes} from 'firebase/storage'
import axios from 'axios';
import { tokenState } from '../../../state/tokenState';


const UploadModalContents = () => {
    const [currentTab,setCurrentTab]=useState('기본 정보')
    const [,setShowUploadModal]=useRecoilState(uploadModalState)
    const [token,]=useRecoilState(tokenState)
    const [file,setFile]=useState('')
    const [fileName,setFileName]=useState('')
    const storage=getStorage()
    const dbURL=process.env.REACT_APP_DATABASE_URL;
    const initialMetaData={
        content:'',
        date:'',
        description:'',
        title:'',
        category:''
    }
    const [metaData,setMetaData]=useState(initialMetaData)

    //input 데이터 저장
    const onChangeMetaData=useCallback((e)=>{
        const {name,value}=e.target
        setMetaData({
            ...metaData,
            [name]:value
        })
    },[metaData])

    //모달 닫기
    const onCloseModal=useCallback(()=>{
        setShowUploadModal(false)
    },[setShowUploadModal])

    //탭 전환
    const onChangeTab=useCallback((e)=>{
        setCurrentTab(e.target.innerText)
    },[])

    //send data
    const onSubmit=(e)=>{
        e.preventDefault()
        const {description,title}=metaData
        //하나라도 비어있으면 return
        if(!file){
            alert('파일 없음')
            return
        }
        if (!description || !title) {
            alert('정보 없음')
            return
        }
        
        const fileRef=ref(storage,`Educations/${metaData.category}/sampleVideo.mp4`)
        //이게되네
        console.log(fileName)

        //storage에 file 업로드
        uploadBytes(fileRef,file)
        .then(res=>{
            setFile('')
            setFileName('')
        })
        .catch(e=>console.log(e))

        //data 전처리
        const today=new Date()
        const postData={...metaData,date:`${today.getFullYear()}.${today.getMonth()+1}.${today.getDate()}`}
        delete postData.category
        console.log(postData)

        //upload meta data to Realtime Database
        axios.post(`${dbURL}/Educations/${metaData.category}.json?auth=${token}`,postData)
        .then(res=>{
            setMetaData(initialMetaData)
            alert('업로드 되었습니다.')
            setShowUploadModal(false)
        })
        .catch(e=>console.log(e))

        
    }



    return (
        <UploadModalContentsWrapper>
            <UploadModalContentsHeader>
                <h1>추가하기</h1>
                <button onClick={onCloseModal}>
                    <MdClear size={35} color='rgba(0, 0, 0, 0.54)'/>
                </button>
            </UploadModalContentsHeader>

            <form onSubmit={onSubmit}>
                <ControlBar onChangeTab={onChangeTab} currentTab={currentTab}/>

                {currentTab==='기본 정보' && <InfoTab onChangeMetaData={onChangeMetaData} metaData={metaData}/>}
                {currentTab==='설정' && <SettingTab onChangeMetaData={onChangeMetaData} setFile={setFile} setFileName={setFileName} metaData={metaData}/>}
            </form>
        </UploadModalContentsWrapper>
    );
};

export default React.memo(UploadModalContents);