import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Main from './pages/Main';

import Login from './pages/Login/Login';
function App() {
  return (
    <div className="App">
      <Routes>
        {/* redirect to login */}
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;
