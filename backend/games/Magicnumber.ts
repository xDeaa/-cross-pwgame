import chalk from "chalk"
import { Socket } from "socket.io"

export default class MagicNumber {
    private magicNumber: number
    private players: Map<string, Player>
    private maxMagicNumber: number = 1337
    private minMagicNumber: number = 0


    constructor(players: Player[]) {
        this.magicNumber = this.generateRandomNumber();
        this.players = players
    }

    start() {
        console.log(chalk.greenBright("Game Started ! 🏁"));
        console.log(chalk.greenBright(`Number to find: ${this.magicNumber} 🎲`));
        for (const [key, player] of this.players) {
            player.socket.emit("event::MagicNumber::Start", "Game Started ! 🏁")
            this.listen(player)
        }
    }


    end(socket: Socket, message: string) {
        console.log(chalk.greenBright(message));
        socket.emit("event::MagicNumber::End", message)
    }

    private generateRandomNumber() {
        return Math.floor(Math.random() * (this.maxMagicNumber - this.minMagicNumber + 1) + this.minMagicNumber);
    }

    private checkNumber(number: number) {
        if (number < this.magicNumber) {
            return "The number is Bigger"
        }
        if (number > this.magicNumber) {
            return "The number is Smaller"
        }

        if (this.minMagicNumber > 0 && number > this.maxMagicNumber) {
            return `The number is between ${this.minMagicNumber} and ${this.maxMagicNumber}`
        }
      
        if(number == this.magicNumber) {
            return "You win 1 point 🎈"
        }

        return "Something went wrong"
    }

    private listen(player: Player) {
        const { socket } = player
        
        socket.on("event::MagicNumber::send", ({ number }) => {
            const numberFind: string = this.checkNumber(number)
            console.log(chalk.gray(numberFind));
            socket.emit("event::MagicNumber::result", numberFind)

            if (numberFind == "You win 1 point 🎈") {
                player.points += 1;
                this.magicNumber = this.generateRandomNumber()
                console.log(chalk.greenBright(`New number to find: ${this.magicNumber} 🎲`));
            }

            if (player.points === 3) {                
                this.magicNumber = 0
                socket.emit("event::MagicNumber::Win", `🎊The player ${player.nickname} win 🎊`)
                console.log(chalk.greenBright(`🎊The player ${player.nickname} win 🎊`));
                this.end(socket, `The Game is finish 👏`)
            }
        })
        
        socket.on("event::MagicNumber::Quit", () => {
            const player = this.players.get(socket.id)
            console.log(player);
        })

        socket.on("disconnect", () => {
            this.players.forEach(player => {                
                if(player.socket.id !== socket.id) {
                    this.end(player.socket, "Your challenger quit the room")
                } else {
                    return this.players.delete(socket.id)
                }
            })        
        })  
    }
}