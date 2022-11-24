import React from 'react';
import { useState, useEffect } from 'react';
import UserSearch from './components/UserSearch';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [userData, setUserData] = useState({});

  return (
    <div className="App App-header">
      <>
        <UserSearch setUserData={setUserData}/>
      </>
    </div>
  );
}

export default App;
