import React from 'react';
import MainContents from '../components/Main/MainContents';
import SideNavigationBar from '../components/SNB/SideNavigationBar';
import GlobalNavigationBar from '../components/GNB/GlobalNavigationBar';
const Main = () => {
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