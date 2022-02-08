import './App.css';
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Login from './pages/login/Login';
import { useRecoilState } from 'recoil';
import { loginState } from './state/login/loginState';

function App() {
  const loginSession = sessionStorage.getItem(
    `firebase:authUser:${process.env.REACT_APP_FIREBASE}:[DEFAULT]`,
  );

  const [, setLogin] = useRecoilState(loginState);

  useEffect(() => {
    setLogin(loginSession ? true : false);
  }, [loginSession, setLogin]);

  return (
    <div className="App">
      <Routes>
        {/* redirect to login */}
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;
