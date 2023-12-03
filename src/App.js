import logo from './logo.svg';
import './App.css';
import { useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import Lobby from './Components/Lobby';
import Gameplay from './Components/Gameplay';
import { Container } from "@mui/material"
import CreateRoom from './Components/Pages/CreateRoom';
import JoinRoom from './Components/Pages/JoinRoom';



function App() {




  return (
    <>
      <div style={{
        backgroundColor: "#dcedc8"
      }}>


        <Routes>
          <Route exact path='/' element={<Lobby />}></Route>
          <Route exact path='/game/:roomID' element={<Gameplay />}></Route>
          <Route exact path='/create-room' element={<CreateRoom />}></Route>
          <Route exact path='/join-room/:roomID' element={<JoinRoom />}></Route>

        </Routes>
      </div>

    </>
  );
}

export default App;
