import socketIO from "socket.io";
import Player from './interface/Player'

export default class Game {
    players : Array<Player>

    constructor() {
        this.players = []
    }

    public addPlayer(player : Player) {
        this.players.push(player)
    }
}