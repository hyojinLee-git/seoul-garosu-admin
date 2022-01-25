import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Adopt from '../../components/adopt/Adopt';
import Education from '../../components/education/Education';
import Tree from '../../components/tree/Tree'

const Contents = () => {
    return (
        <>
            <Routes>
                <Route path="adopt" element={<Adopt/>}/>
                <Route path="tree" element={<Tree/>}/>
                <Route path="education" element={<Education/>}/>
            </Routes>
        </>
    );
};

export default Contents;