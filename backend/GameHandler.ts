import express from "express";
import { createServer } from "http";
import socketIO from "socket.io"
import chalk from "chalk"
import GameFactory from "./GameFactory";

export default class GameHandler {
    public static instance: GameHandler | null = null
    private app: any
    private server: any
    private socket: any
    private listPlayers: Map<string, Player> = new Map()

    public static getInstance() {
        if (GameHandler.instance === null) {
            GameHandler.instance = new GameHandler()
        }

        return GameHandler.instance
    }

    public run() {
        const PORT = process.env.PORT;
        this.app = express();
        this.server = createServer(this.app);

        this.server.listen(PORT, () => {
            console.log(chalk.magenta(` ✨Server is running on localhost:${PORT} ✨`));
        });

        this.socket = socketIO(this.server);

        this.socket.on("connection", socketClient => {
            console.log(chalk.cyan("New Connection"));

            socketClient.on("event::setNickname", ({nickname})=> {                
                this.addPlayer(socketClient, nickname);
            })

            this.listener(socketClient)
        })
    }

    private addPlayer(socket: any, nickname: string) {
        console.log(chalk.green(`🎮 New Player: ${nickname} 🎮`));
        return this.listPlayers.set(socket.id, {nickname, socket, onGame: false})
    }

    private listener(socketClient) {
        socketClient.on("event::Game::join", ({gameName}) => {
            let player = this.listPlayers.get(socketClient.id)
            player.selectedGame = gameName;

            let challenger = this.findChallenger(player.socket.id, gameName);

            if(challenger) {
                console.log(chalk.green(`👊 New Challenger: ${challenger.nickname} 👊`));
                const game = new GameFactory()
                
                const players = this.addPlayersInGame([player, challenger])
                console.log(players);
                
                
                const choosedGame = game.createGame(gameName, players)
                choosedGame.start()
            }
        })
    }

    private findChallenger(playerId: string, title: string) {
        for(const [, player] of this.listPlayers.entries()) {            
            if(player.socket.id !== playerId && player.onGame === false && player.selectedGame === title) {
                return player;
            }
        }
         return null
    }

    private addPlayersInGame(players: Player[]) {
        for(const player of players) {
            this.listPlayers.set(player.socket.id, {...player, onGame: true, points: 0})
        }

        return this.listPlayers
    }
}