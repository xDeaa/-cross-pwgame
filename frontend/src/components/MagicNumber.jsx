import React, { useState, useContext, useEffect } from "react";
import { useHistory } from 'react-router-dom'

import { contextSocket } from "../contexts/SocketProvider";
import WaitGame from "./WaitGame"

const MagicNumber = () => {
  const io = useContext(contextSocket)
  const history = useHistory();
  const [gameStarted, setGameStarter] = useState(false);
  const [number, setNumber] = useState("");

  useEffect(() => {
    io.on("event::MagicNumber::Start", () => {
      setGameStarter(true)
    })

    io.on("event::MagicNumber::result", message => {
      alert(message)
    })

    io.on("event::MagicNumber::Win", message => {
      alert(message)
    })

    io.on("event::MagicNumber::End", message => {
      alert(message)
      io.emit("event::Game::End")
      history.push('/games')
    })

  }, [])

  const handleNumber = event => {
    setNumber(event.target.value);
  };



  const sendNumber = () => {
    io.emit("event::MagicNumber::send", { number });
  };

  if (!gameStarted) {
    return <WaitGame />
  }
  return (
    <section className="hero is-fullheight is-light">
      <div className="hero-head">
        <div className="container">
          <div className="tabs is-centered">
            <h1>MagicNumber Game</h1>
          </div>
        </div>
      </div>
      <div className="hero-body">
        <div className="container">
          <header className="bd-index-header">
            <div className="field">
              {
                !gameStarted ? <h1>Veuillez attendre un autre joueur</h1>
                  : <>
                    <div className="control">
                      <input className="input" onChange={handleNumber} value={number} />
                    </div>
                    <div className="control">
                      <a className="button is-info" onClick={sendNumber}>
                        Send
                      </a>
                    </div>
                  </>
              }
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

export default MagicNumber;
