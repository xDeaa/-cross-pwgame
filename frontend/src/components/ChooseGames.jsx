import React, { useContext, useState } from "react";
import { contextSocket } from "../contexts/SocketProvider";
import { useHistory } from 'react-router-dom'

const ChooseGames = () => {
  const [player, setPlayer] = useState("");

  const io = useContext(contextSocket);
  const history = useHistory();

  io.on("event::Login", payload => {
    setPlayer(payload)
  })

  const joinGame = (game) => {
    io.emit("event::Game::join", { gameName: game, player: player })
    history.push(`/games/${game}`)
  }

  return (
    <section className="hero is-fullheight is-light">
      <div className="hero-body">
        <div className="container">
          <header className="bd-index-header">
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
          </header>
        </div>
      </div>
      <div className="hero-foot">
        <div className="container">
          <div className="tabs is-centered">
            <ul>
              <li>
                <a>Let's Rock!</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChooseGames;
