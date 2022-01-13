import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GlobalNavigationBar from './components/GNB/GlobalNavigationBar';
import Main from './components/Main/Main';
import SideNavigationBar from './components/SNB/SideNavigationBar';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={App} />
      </Routes>
      <GlobalNavigationBar />
      <div style={{ display: 'flex' }}>
        <SideNavigationBar />
        <Main />
      </div>
    </div>
  );
}

export default App;
