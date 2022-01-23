import React from 'react';
import MainContents from '../components/Main/MainContents';
import SideNavigationBar from '../components/SNB/SideNavigationBar';
import GlobalNavigationBar from '../components/GNB/GlobalNavigationBar';
import { authService } from '../utils/firebase';
import { Navigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import ApplyListModal from '../components/Main/applyListModal/ApplyListModal';
import { applyModalState } from '../state/applyModalState';
const Main = () => {
    const [showApplyModal]=useRecoilState(applyModalState)

    //로그인 정보 없을시 강제 이동
    // if(!authService.currentUser){
    //     return <Navigate replace to="/login"/>
    // }
    return (
        <>
            <GlobalNavigationBar />
            <div style={{ display: 'flex' }}>
                <SideNavigationBar />
                <MainContents/>
            </div>
            {showApplyModal && <ApplyListModal/>}
        </>
    );
};

export default Main;