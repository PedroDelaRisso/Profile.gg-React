import React from 'react';
import { useState, useEffect } from 'react';
import UserSearch from './components/UserSearch';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import BestMap from './components/BestMap';

function App() {
  const [userData, setUserData] = useState({});

  return (
    <div className="App App-header">
      <>
        <UserSearch setUserData={setUserData}/>
        <BestMap userData={userData}/>
      </>
    </div>
  );
}

export default App;
