import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Adopt from '../../components/adopt/Adopt';
import Education from '../../components/education/Education';
import Tree from '../../components/tree/Tree'

const Contents = () => {
    return (
        <>
            <Routes>
                <Route path="adopt/:sideMenu" element={<Adopt/>}/>
                <Route path="tree/:sideMenu" element={<Tree/>}/>
                <Route path="education/:sideMenu" element={<Education/>}/>
            </Routes>
        </>
    );
};

export default Contents;