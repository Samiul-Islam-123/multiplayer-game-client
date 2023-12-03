import { TextField } from "@mui/material";
import React, { useState } from "react";
import "./Lobby.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import socket from "../Socket";

function Lobby() {


  useEffect(() => {
    socket.on('create-room-res', data => {
      if (data.success == true)
        navigate(`/game/${data.roomData.roomID}`);
    })

  }, [socket])

  const navigate = useNavigate();

  const [username, setUsername] = useState(null);
  function click() {
    //const btn = document.getElementsByClassName("")
    console.log('clicked')
  }

  const RequestCreateRoom = () => {
    socket.emit('create-room-req', username);
  }

  return (
    <>
      <div style={{

        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",



      }}>
        <div className="container">
          <h1 style={{
            fontSize: "1.2rem",
            fontWeight: "600"
          }}>Enter Display Name:</h1>
          <input className="imput"
            style={{
              padding: "10px",
              borderRadius: "15px",
              marginBottom: "30px",
              border: "none",




            }}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            type="text"
            placeholder="Enter Here"
          />



          {username ? (
            <>
              <div style={{
                display: "flex",
                flexDirection: "column"
              }}>

                <button onClick={() => {
                  RequestCreateRoom();
                  //navigate("/");
                }} className="control-button">create room</button>
                <button onClick={() => {
                  // navigate("/join-room/:roomID");
                }} className="control-button">online room</button>
              </div>
            </>
          ) : null}
        </div>
      </div >
    </>
  );
}

export default Lobby;
