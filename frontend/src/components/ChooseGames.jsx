import React, { useContext } from "react";
import { context } from "../contexts/SocketProvider";
import { useHistory } from 'react-router-dom'

const ChooseGames = () => {
  const io = useContext(context);
  const history = useHistory();
  const joinGame = (game) => {
    io.emit("event::Game::join", game)
    history.push(`/games/${game}`)
  }

  return (
    <div className="field">
      <div className="control">
        <a className="button is-info" onClick={() => joinGame("MagicNumber")}>
            MagicNumber
        </a>
        {/* <a className="button is-info" onClick={() => sendGame("QuickWord")}>
            QuickWord
        </a>
        <a className="button is-info" onClick={() => sendGame("WordAndFurious")}>
            WordAndFurious
        </a> */}
      </div>
    </div>
  );
};

export default ChooseGames;
