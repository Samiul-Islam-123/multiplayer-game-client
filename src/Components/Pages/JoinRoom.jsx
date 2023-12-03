import React from "react";
import "./JoinRoom.css";
import { useState } from "react";
import { useEffect } from "react";
import socket from "../../Socket";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function JoinRoom() {

  const navigate = useNavigate();
  const { roomID } = useParams();


  useEffect(() => {
    socket.on('join-room-response', message => {
      if (message.success == true)
        navigate(`/game/${roomID}`)

      else {
        alert("Room is filled :(");
        navigate(-1)
      }
    })
  }, [socket])

  function acceptName() {
    const username = prompt("Please Enter your name");

    return username;
  }

  useEffect(() => {
    var username = "";
    while (username == "" || username == null) {
      username = acceptName();
    }

    const UserData = {
      username: username,
      roomID: roomID
    };

    socket.emit('join-room-request', UserData);

  }, [])

  return (
    <>
      Gathering Data
    </>
  );
}

export default JoinRoom;
