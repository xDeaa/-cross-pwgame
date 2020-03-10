import React, { createContext } from "react"
import socketIO from "socket.io-client";

const io = socketIO("http://localhost:3000");

export const context = createContext(io);

export const SocketProvider = ({children}) => (
    <context.Provider value={io}>
        {children}
    </context.Provider>
)


