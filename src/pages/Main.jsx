import React from 'react';
import MainContents from '../components/Main/MainContents';
import SideNavigationBar from '../components/SNB/SideNavigationBar';
import GlobalNavigationBar from '../components/GNB/GlobalNavigationBar';
import { authService } from '../utils/firebase';
import { Navigate } from 'react-router-dom';
const Main = () => {
    if(!authService.currentUser){
        return <Navigate replace to="/login"/>
    }
    return (
        <>
            <GlobalNavigationBar />
            <div style={{ display: 'flex' }}>
                <SideNavigationBar />
                <MainContents/>
            </div>
        </>
    );
};

export default Main;