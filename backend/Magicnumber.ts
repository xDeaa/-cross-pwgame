import Game from './Game'
import Player from './interface/Player';

export default class MagicNumber extends Game {
    private magicNumber: Number
    constructor() {
        super()
        this.magicNumber = this.generateRandomNumber();

    }

    public initGame() {

    }

    private generateRandomNumber() {
        return Math.floor(Math.random() * (1337 - 0 + 1) + 0);
    }

    private checkNumber(number: number, player: Player) {

        if(number < this.magicNumber) {
            return "Bigger"
        }
        if(number > this.magicNumber) {
            return "Smaller"
        }

        this.players[player.socket.id].points += 1
        return "You win 1 point"
    }
}