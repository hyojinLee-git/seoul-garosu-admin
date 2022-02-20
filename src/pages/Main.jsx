import React, { useCallback, useEffect } from 'react';
import SideNavigationBar from '../layouts/SNB/SideNavigationBar';
import GlobalNavigationBar from '../layouts/GNB/GlobalNavigationBar';
import { Navigate, Routes,Route, useParams, } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import ApplyModal from '../components/adopt/applyModal/ApplyModal';
import { applyModalState } from '../state/applyModalState';
import Contents from '../layouts/contents/Contents';
import { modalState } from '../state/modalState';
import ApprovalModal from '../components/adopt/approvalModal/ApprovalModal';
import { loginState } from '../state/login/loginState';
import { uploadModalState } from '../state/education/uploadModalState';
import UploadModal from '../components/education/upload/UploadModal';
import { authService } from '../utils/firebase';
import { tokenState } from '../state/tokenState';
import {useCookies} from 'react-cookie'
import { onAuthStateChanged} from 'firebase/auth'
const Main = () => {
    const [showApplyModal]=useRecoilState(applyModalState)
    const [showModal,]=useRecoilState(modalState)
    const [login,]=useRecoilState(loginState)
    const [showUploadModal,]=useRecoilState(uploadModalState)
    const [,setToken]=useRecoilState(tokenState)
    const params=useParams()
    const [, setCookie]=useCookies(['url'])

    const getToken= useCallback( ()=>{
        onAuthStateChanged(authService,(user)=>{
            if(user){
                setToken(user.accessToken)
            }
        })
        
    },[setToken])

    useEffect(()=>{
        getToken()
        setCookie('url',Object.values(params)[0])
    },[getToken, params, setCookie])
    
    //로그인 정보 없을시 강제 이동
    if(!login){
        return <Navigate replace to="/login"/>
    }

    return (
        <>
            <GlobalNavigationBar />
            <div style={{ display: 'flex' }}>
                <Routes>
                    <Route path=":mainMenu/:sideMenu" element={<SideNavigationBar />}/>
                </Routes>
                <Contents/>
            </div>
            {showApplyModal && <ApplyModal/>}
            {showModal && <ApprovalModal/>}
            {showUploadModal && <UploadModal/>}
        </>
    );
};

export default Main;