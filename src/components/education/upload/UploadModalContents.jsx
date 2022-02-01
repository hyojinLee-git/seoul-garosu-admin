import React, { useState } from 'react';
import {MdClear} from 'react-icons/md'
import {UploadModalContentsWrapper,UploadModalContentsHeader,UploadModalTab,Button} from './style'
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
    const [file,setFile]=useState('')
    const [fileName,setFileName]=useState('')
    const storage=getStorage()
    const dbURL=process.env.REACT_APP_DATABASE_URL;
    const [metaData,setMetaData]=useState({
        content:'',
        date:'',
        description:'',
        title:''
    })


    const onCloseModal=()=>{
        setShowUploadModal(false)
    }
    const onChangeTab=(e)=>{
        setCurrentTab(e.target.innerText)
    }
    const onSubmit=(e)=>{
        e.preventDefault()
        const {content,description,title}=metaData
        //하나라도 비어있으면 return
        if(!file){
            alert('파일 없음')
            return
        }
        if(!content || !description || !title) {
            alert('정보 없음')
            return
        }
        
        const fileRef=ref(storage,"Educations/Planting/sampleVideo.mp4")
        //이게되네
        console.log(fileName)

        //storage에 file 업로드
        uploadBytes(fileRef,file).then(res=>{
            console.log(res)
            console.log('submit')
        })
        .catch(e=>console.log(e))

        //upload meta data to Realtime Database
        axios.post(`${dbURL}/Educations/Planting.json?auth=${tokenState}`,metaData)
        .then(res=>console.log(res))
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

                {currentTab==='기본 정보' && <InfoTab/>}
                {currentTab==='설정' && <SettingTab setFile={setFile} setFileName={setFileName}/>}
            </form>
        </UploadModalContentsWrapper>
    );
};

export default UploadModalContents;