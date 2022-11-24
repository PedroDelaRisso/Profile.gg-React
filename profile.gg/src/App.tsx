import React from 'react';
import { useState, useEffect } from 'react';
import UserSearch from './components/UserSearch';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [username, setUsername] = useState('');

  return (
    <div className="App App-header">
      <UserSearch/>
    </div>
  );
}

export default App;
