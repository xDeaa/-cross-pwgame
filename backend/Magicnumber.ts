import chalk from "chalk"

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
            console.log(player.points);

            if (player.points === 3) {
                player.socket.emit("event::MagicNumber:Win", `🎊The player ${player.nickname} win 🎊`)
                this.end()
            }
        }
    }


    end() {
        console.log(chalk.greenBright("The Game is finish 👏"));
        return false
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

        return "You win 1 point 🎈"
    }

    private listen(player: Player) {
        const { socket } = player
        socket.on("event::MagicNumber::send", ({ number }) => {
            //console.log(player);

            const numberFind = this.checkNumber(number)
            console.log(chalk.gray(numberFind));
            socket.emit("event::MagicNumber::result", numberFind)

            if (numberFind == "You win 1 point 🎈") {
                //this.players.set(player.socket.id, {...player, points})
                this.magicNumber = this.generateRandomNumber()
                console.log(chalk.greenBright(`New number to find: ${this.magicNumber} 🎲`));
            }
        })
    }
}