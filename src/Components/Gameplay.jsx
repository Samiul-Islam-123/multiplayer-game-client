import React, { useState } from 'react';
import { Button, Grid, Typography } from "@mui/material"
import socket from "../Socket";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import apiURL from '../apiURL';
import ClientURL from '../ClientURL';

function Gameplay() {

    const { roomID } = useParams();

    const [userX, setUserX] = useState("Waiting ...");
    const [userO, setUserO] = useState("Waiting ...");
    const [joined, setJoined] = useState(false);


    useEffect(() => {
        socket.on("join-room-response", data => {
            alert(data.message)

        })

        socket.on('response-roomData', roomData => {

            console.log(roomData)
            setUserX(roomData.userX_name);
            if (roomData.userO_id) {
                setUserO(roomData.userO_name);
                setJoined(true);
            }
        })

    }, [socket])

    useEffect(() => {
        socket.emit('request-roomData', roomID);
    }, [])



    return (
        <>

            <Typography variant='h5' align='center'>
                Player X : {userX}
            </Typography >
            <Typography variant='h5' align='center'>
                Player O : {userO}
            </Typography>

            <Typography align='center'>
                Room ID : {roomID}
            </Typography>

            {!joined ? (<> <Typography variant='h5' align='center'>
                Share this url : {`${ClientURL}/join-room/${roomID}`}
                <Button onClick={async () => {
                    const url = `${ClientURL}/join-room/${roomID}`;
                    await navigator.clipboard.writeText(url);
                    alert('URL Copied to clipboard');
                }} variant='contained'>Copy URL</Button>
            </Typography></>) : null}

            <div className='game-board-container' style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: '100vh', // Set the height to 100% of the viewport height
            }}>
                <div className='game-board'>
                    <Grid container >
                        <Grid item xs={4}>
                            <Button variant='outlined' style={{ backgroundColor: 'white', width: '100px', height: '100px' }}>X</Button>                    </Grid>
                        <Grid item xs={4}>
                            <Button variant='outlined' style={{ backgroundColor: 'white', width: '100px', height: '100px' }}>X</Button>                    </Grid>
                        <Grid item xs={4}>
                            <Button variant='outlined' style={{ backgroundColor: 'white', width: '100px', height: '100px' }}>X</Button>                    </Grid>
                    </Grid>

                    <Grid container>
                        <Grid item xs={4}>
                            <Button variant='outlined' style={{ backgroundColor: 'white', width: '100px', height: '100px' }}>X</Button>                    </Grid>
                        <Grid item xs={4}>
                            <Button variant='outlined' style={{ backgroundColor: 'white', width: '100px', height: '100px' }}>X</Button>                    </Grid>
                        <Grid item xs={4}>
                            <Button variant='outlined' style={{ backgroundColor: 'white', width: '100px', height: '100px' }}>X</Button>                    </Grid>
                    </Grid>

                    <Grid container>
                        <Grid item xs={4}>
                            <Button variant='outlined' style={{ backgroundColor: 'white', width: '100px', height: '100px' }}>X</Button>                    </Grid>
                        <Grid item xs={4}>
                            <Button variant='outlined' style={{ backgroundColor: 'white', width: '100px', height: '100px' }}>X</Button>                    </Grid>
                        <Grid item xs={4}>
                            <Button variant='outlined' style={{ backgroundColor: 'white', width: '100px', height: '100px' }}>X</Button>                    </Grid>
                    </Grid>
                </div>
            </div>
        </>
    )
}

export default Gameplay