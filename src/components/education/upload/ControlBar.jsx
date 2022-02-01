import React from 'react';
import {UploadModalTab,Button} from './style'

const ControlBar = ({currentTab,onChangeTab}) => {

    return (
        <UploadModalTab>
        <span>
            <Button type='button' background="white" onClick={onChangeTab} className={currentTab==='기본 정보'? 'active':''}>
                기본 정보
            </Button>
            <Button type='button' background="white" onClick={onChangeTab} className={currentTab==='설정'? 'active':''}>
                설정
            </Button>
        </span>
        <Button type="submit" color="white" background="#669AFF" radius="5px">업로드</Button>
    </UploadModalTab>
    );
};

export default ControlBar;