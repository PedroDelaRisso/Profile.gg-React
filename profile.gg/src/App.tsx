
import { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Kills from './components/Kills';
import GameTime from './components/GameTime'
import Rank from './components/Rank'
import WinRate from './components/WinRate';
import BestMap from './components/BestMap'
import HitLocation from './components/HitLocation'
import SideBar from './components/SideBar';

function App() {
  return (
    <div className='vh-100 vw-100 d-flex flex-row bg-primary'>
      <SideBar playerName="SantaCleiton"></SideBar>
        <div className='vh-100 d-flex flex-column justify-content-around app' style={{flex:3}}>
          <div className='d-flex flex-row justify-content-around flex-wrap' style={{flex:1}}>
            <Kills abatesTotais={652}></Kills>
            <GameTime horas={13} minutos={45}></GameTime>
          </div>
          <div className='d-flex flex-row justify-content-around flex-wrap' style={{flex:1}}>
            <Rank rankName="IMORTAL 3"></Rank>
            <WinRate winrate={51}></WinRate>
          </div>
          <div className='d-flex flex-row justify-content-around flex-wrap' style={{flex:1}}>
            <BestMap mapName={"BIND"}></BestMap>
            <HitLocation head={21} body={55} leg={28}></HitLocation>
          </div>
      </div>
    </div>
  );
}

export default App;
