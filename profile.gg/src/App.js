import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SideBar from "./components/SideBar";
import UserSearch from "./components/UserSearch";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Comp from "./components/Comp";






function App() {
  const [userData, setUserData] = useState({});
  const [username, setUsername] = useState("LOUD Coreano#LLL"); // debug apenas, remover depois
  const printRef = useRef();




  const handleDownloadImage = async (e) => {
    e.target.className += " d-none"
    const element = printRef.current;
    const canvas = await html2canvas(element);
    let [player_name, tag] = username.split('#');
    player_name = player_name.replace(' ', '_');

    const data = canvas.toDataURL('image/jpg');
    const link = document.createElement('a');

    if (typeof link.download === 'string') {
      link.href = data;
      link.download = `profile.gg_${player_name}.jpg`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(data);
    }

    e.target.className = e.target.className.replace("d-none", '')
  };
  return (
    <>
      <Router>
        <div className="app" >
          <Routes>
            <Route path="/" element={
              <UserSearch username={username} setUsername={setUsername} setUserData={setUserData} />
            }>
            </Route>
            <Route path="/profile" element={
              <div className="vh-100 vw-100 d-flex flex-row bg-primary" id="background-profile" ref={printRef}>
                <SideBar playerName={username} userData={userData} downloadHandle={handleDownloadImage}></SideBar>

                <div
                  className="vh-100 d-flex flex-column justify-content-around app"
                  style={{ flex: 3 }}
                >
                  <div
                    className="d-flex flex-row justify-content-around flex-wrap"
                    style={{ flex: 1 }}
                  >
                    <Comp userData={userData} userName={username}></Comp>
                    <Comp userData={userData} userName={username}></Comp>
                  </div>
                  <div
                    className="d-flex flex-row justify-content-around flex-wrap"
                    style={{ flex: 1 }}
                  >
                    <Comp userData={userData} userName={username}></Comp>
                    <Comp userData={userData} userName={username}></Comp>
                  </div>
                  <div
                    className="d-flex flex-row justify-content-around flex-wrap"
                    style={{ flex: 1 }}
                  >
                    <Comp userData={userData} userName={username}></Comp>
                    <Comp userData={userData} userName={username}></Comp>
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
