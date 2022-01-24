import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Adopt from '../../components/adopt/Adopt';
import Tree from '../../components/tree/Tree'

const Contents = () => {
    return (
        <>
            <Routes>
                <Route path="adopt" element={<Adopt/>}/>
                <Route path="tree" element={<Tree/>}/>
                {/* <Route path="approval" element={<MainContents/>}/> */}
            </Routes>
        </>
    );
};

export default Contents;