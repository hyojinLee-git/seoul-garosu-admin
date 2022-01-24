import React from 'react';
import SideNavigationBar from '../layouts/SNB/SideNavigationBar';
import GlobalNavigationBar from '../layouts/GNB/GlobalNavigationBar';
import { authService } from '../utils/firebase';
import { Navigate, Routes,Route } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import ApplyModal from '../components/adopt/applyModal/ApplyModal';
import { applyModalState } from '../state/applyModalState';
import Contents from '../layouts/contents/Contents';
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
                <Contents/>
            </div>
            {showApplyModal && <ApplyModal/>}
        </>
    );
};

export default Main;