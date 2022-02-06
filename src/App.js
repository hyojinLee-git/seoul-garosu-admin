import './App.css';
import React, { useCallback, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Main from './pages/Main';
import Login from './pages/login/Login';
import { useRecoilState } from 'recoil';
import { loginState } from './state/login/loginState';
import { authService } from './utils/firebase';
import { tokenState } from './state/tokenState';

function App() {
  const loginSession = sessionStorage.getItem(
    `firebase:authUser:${process.env.REACT_APP_FIREBASE}:[DEFAULT]`,
  );
  const [login, setLogin] = useRecoilState(loginState);
  const [token, setToken] = useRecoilState(tokenState);
  const getToken = useCallback(async () => {
    await authService.currentUser
      .getIdToken()
      .then(token => {
        setToken(token);
      })
      .catch(e => console.log(e));
  }, [setToken]);

  useEffect(() => {
    setLogin(loginSession ? true : false);
    getToken();
  }, [getToken, loginSession, setLogin]);

  // if (!login) return <Navigate path="/login" element={<Login />} />;

  return (
    <div className="App">
      <Routes>
        {/* redirect to login */}
        {/* <Route path="/" element={<Navigate replace to="/login" />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;
