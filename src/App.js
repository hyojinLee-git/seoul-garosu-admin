import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GlobalNavigationBar from './components/GNB/GlobalNavigationBar';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={App} />
      </Routes>
      <GlobalNavigationBar />
      initial react
    </div>
  );
}

export default App;
