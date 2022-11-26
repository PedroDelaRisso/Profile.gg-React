import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Kills from "./components/Kills";
import GameTime from "./components/GameTime";
import Rank from "./components/Rank";
import WinRate from "./components/WinRate";
import BestMap from "./components/BestMap";
import HitLocation from "./components/HitLocation";
import SideBar from "./components/SideBar";
import UserSearch from "./components/UserSearch";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Comp from "./components/Comp";

function App() {
  const [userData, setUserData] = useState({});
  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={
              <UserSearch setUserData={setUserData} />
            }>
            </Route>
            <Route path="/profile" element={
              <div className="vh-100 vw-100 d-flex flex-row bg-primary">
                <SideBar playerName="SantaCleiton"></SideBar>
                <div
                  className="vh-100 d-flex flex-column justify-content-around app"
                  style={{ flex: 3 }}
                >
                  <div
                    className="d-flex flex-row justify-content-around flex-wrap"
                    style={{ flex: 1 }}
                  >
                    <Comp></Comp>
                    <Comp></Comp>
                  </div>
                  <div
                    className="d-flex flex-row justify-content-around flex-wrap"
                    style={{ flex: 1 }}
                  >
                    <Comp></Comp>
                    <Comp></Comp>
                  </div>
                  <div
                    className="d-flex flex-row justify-content-around flex-wrap"
                    style={{ flex: 1 }}
                  >
                    <Comp></Comp>
                    <Comp></Comp>
                  </div>
                </div>
              </div>
            }>
            </Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
