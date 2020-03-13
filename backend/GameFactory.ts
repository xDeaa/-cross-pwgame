import MagicNumber from "./Magicnumber";
import Game from "./Game";

export default class GameFactory {
    public createGame(gameName: string) {
        let game : Game
        switch(gameName) {
            case "MagicNumber":
                return new MagicNumber()
                break;
        }
    }
}