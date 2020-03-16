import SocketIO, {Socket} from 'socket.io'

declare namespace NodeJS {
    export interface ProccessEnv {
        PORT: string
    }

    export interface Player {
        nickname: string,
        socket: Socket,
        selectedGame?: string,
        onGame: boolean
        points: number
    }
}