import express from "express";
import { createServer, Server } from "http";
import { config } from "dotenv";
import socketIO from "socket.io";

config();

interface PlayerLogged {
  name: String,
  connected: boolean
}

type PlayersLogList = {[id: string]: PlayerLogged}

const PORT = process.env.PORT;

const app = express();
const server: Server = createServer(app);
const io: socketIO.Server = socketIO(server);
let players: PlayersLogList = {};


const createUser = (nickname: string) => {
  return {name: nickname, connected: true}
}

app.get("/", (_, res) => {
  res.send("hello fellows");
});

io.on("connection", socket => {
  socket.on("event::initialize", payload => {

    if(payload.nickname !== "") {
      players[socket.id] = createUser(payload.nickname);
      console.log(`New player: ${players[socket.id].name}`);
      
      return io.emit("event::Login", players[socket.id].name);
    }

    io.emit("event::enterNickname", 'Please enter a nickname')
    
    // if (Object.keys(players).length === 2) {
    //   io.emit("event::gameStart");
    // }
  });

  socket.on("event::MagicNumeber:join", payload => {
    console.log(payload);
    
  });

});

server.listen(PORT, () => {
  console.log(`Server ready at ${PORT} ...`);
});
