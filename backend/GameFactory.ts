import MagicNumber from "./games/Magicnumber";
import Game from "./Game";

export default class GameFactory {
    public createGame(gameName: string, players: Map<string, Player>): Game {
        switch(gameName) {
            case "MagicNumber":
                return new MagicNumber(players)
        }
    }
}