import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Main from './pages/Main';
import Login from './pages/login/Login';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* redirect to login */}
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<Main />} />
        {/* <Route path="tree/*" element={<Main />} /> */}
      </Routes>
    </div>
  );
}

export default App;
