import checkEnv from './sys/prelude';
import postlude from "./sys/postlude"

import GameHandler from "./GameHandler";

checkEnv()
postlude()
const game = GameHandler.getInstance()
game.run()