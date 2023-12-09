import React, { useState, useEffect } from 'react';
import { Button, Grid, Typography } from "@mui/material";
import socket from "../Socket";
import { useParams } from "react-router-dom";
import ClientURL from '../ClientURL';

function Gameplay() {

    const { roomID } = useParams();

    const [userX, setUserX] = useState("Waiting ...");
    const [userO, setUserO] = useState("Waiting ...");
    const [joined, setJoined] = useState(false);
    const [symbol, setSymbol] = useState("");
    const [receivedData, setReceivedData] = useState({});
    //const initialMatrix = Array.from({ length: 3 }, () => Array(3).fill(null));
    const [gameboard, setGameboard] = useState([
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]])

    const [myTurn, setMyTurn] = useState(false);



    useEffect(() => {

        socket.on("join-room-response", data => {
            alert(data.message);

        });

        socket.on('gameboard-data', gameBoardData => {
            setGameboard(gameBoardData)
            //console.log(gameboard)

        })

        socket.on('response-roomData', roomData => {
            console.log(roomData);
            if (roomData.userO_id === socket.id)
                setSymbol("O");

            else if (roomData.userX_id === socket.id)
                setSymbol("X")

            setUserX(roomData.userX_name);
            if (roomData.userO_id) {
                setUserO(roomData.userO_name);
                setJoined(true);
            }
        });

        socket.on('turn-X', (data) => {
            console.log(data)
            if (data == socket.id)
                setMyTurn(true);
        })

        socket.on('turn-O', (data) => {
            if (data == socket.id)
                setMyTurn(true)
        })

        socket.on('button-coordinates-response', data => {
            console.log('My Turn : ' + myTurn)

            const prevData = [...gameboard]
            prevData[data.row][data.col] = data.symbol;
            setGameboard(prevData);

        })




    }, []);



    useEffect(() => {
        socket.emit('request-roomData', roomID);
    }, [roomID]);

    const handleClick = (row, col) => {

        const prevData = [...gameboard]
        prevData[row][col] = symbol;
        setGameboard(prevData);

        //console.log(gameboard);

        socket.emit('button-coordinates', {
            row: row,
            col: col,
            roomID: roomID,
            symbol: symbol,
            gameboard: gameboard
        })
    };

    return (
        <>
            <Typography variant='h5' align='center'>
                Player X : {userX}
            </Typography>
            <Typography variant='h5' align='center'>
                Player O : {userO}
            </Typography>

            <Typography align='center'>
                Room ID : {roomID}
            </Typography>

            {!joined ? (
                <>
                    <Typography variant='h5' align='center'>
                        Share this url : {`${ClientURL}/join-room/${roomID}`}
                        <Button onClick={async () => {
                            const url = `${ClientURL}/join-room/${roomID}`;
                            await navigator.clipboard.writeText(url);
                            alert('URL Copied to clipboard');
                        }} variant='contained'>Copy URL</Button>
                    </Typography>
                </>
            ) : null}

            <div className='game-board-container' style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: '100vh', // Set the height to 100% of the viewport height
            }}>
                <div className='game-board'>
                    {[0, 1, 2].map((row) => (
                        <Grid container key={row}>
                            {[0, 1, 2].map((col) => (
                                <Grid item xs={4} key={col}>
                                    <Button
                                        variant='outlined'
                                        style={{ backgroundColor: 'white', width: '100px', height: '100px' }}
                                        onClick={() => handleClick(row, col)}
                                    >
                                        {
                                            gameboard[row][col]
                                        }
                                    </Button>
                                </Grid>
                            ))}
                        </Grid>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Gameplay;
