import React, { createContext } from "react"
import socketIO from "socket.io-client";

const io = socketIO("http://localhost:3000");

export const contextSocket = createContext(io);

export const SocketProvider = ({children}) => (
    <contextSocket.Provider value={io}>
        {children}
    </contextSocket.Provider>
)


