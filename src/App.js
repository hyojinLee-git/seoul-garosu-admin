import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Main from './pages/Main';

import Login from './pages/Login/Login';
import Tree from './pages/Tree';
function App() {
  return (
    <div className="App">
      <Routes>
        {/* redirect to login */}
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<Main />} />
        <Route path="/tree" element={<Tree />} />
        {/* <Route path="/main/*">
          <Route path="all" element={<Main />} />
        </Route> */}
      </Routes>
    </div>
  );
}

export default App;
