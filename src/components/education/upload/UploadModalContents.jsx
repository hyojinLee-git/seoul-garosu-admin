import React, { useState } from 'react';
import {MdClear} from 'react-icons/md'
import {UploadModalContentsWrapper,UploadModalContentsHeader,UploadModalTab,Button} from './style'
import InfoTab from './InfoTab';
import SettingTab from './SettingTab';
const UploadModalContents = () => {
    const [currentTab,setCurrentTab]=useState('기본 정보')
    const onChangeTab=(e)=>{
        setCurrentTab(e.target.innerText)
    }
    return (
        <UploadModalContentsWrapper>
            <UploadModalContentsHeader>
                <h1>추가하기</h1>
                <button>
                    <MdClear size={35} color='rgba(0, 0, 0, 0.54)'/>
                </button>
            </UploadModalContentsHeader>
            <UploadModalTab>
                <span>
                    <Button background="white" onClick={onChangeTab} className={currentTab==='기본 정보'? 'active':''}>기본 정보</Button>
                    <Button background="white" onClick={onChangeTab} className={currentTab==='설정'? 'active':''}>설정</Button>
                </span>
                <Button color="white" background="#669AFF" radius="5px">업로드</Button>
            </UploadModalTab>

            {currentTab==='기본 정보' && <InfoTab/>}
            {currentTab==='설정' && <SettingTab/>}
        </UploadModalContentsWrapper>
    );
};

export default UploadModalContents;