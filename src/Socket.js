import io from "socket.io-client";
import apiURL from "./apiURL";

const socket = io(apiURL);

export default socket;