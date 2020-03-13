import socketIO, { Socket } from "socket.io";

export default interface Player {
    name: String,
    socket: socketIO.Socket,
    points: number
}