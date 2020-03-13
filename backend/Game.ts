import socketIO from "socket.io";
import Player from './interface/Player'

type PlayersList = {[id: string]: Player}

export default  abstract class Game {
    players : PlayersList

    constructor() {
        this.players = {}
    }

    public addPlayer(player : Player) {
        this.players[player.socket.id] = player
    }
}