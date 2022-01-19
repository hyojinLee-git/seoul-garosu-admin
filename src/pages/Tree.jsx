import React from 'react';
import MainContents from '../components/Tree/MainContents';
import SideNavigationBar from '../components/SNB/SideNavigationBar';
import GlobalNavigationBar from '../components/GNB/GlobalNavigationBar';



const Tree = () => {
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

export default Tree;