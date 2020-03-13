import React, { useState, useContext } from "react";
import { contextSocket } from "../contexts/SocketProvider";

const MagicNumber = () => {
  const [gameStarted, setGameStarter] = useState(false);
  const [disabled, setdisabled] = useState(true);


  const io = useContext(contextSocket)
  const [number, setNumber] = useState("");
  const initGame = () => {
    io.emit("event::MagicNumber::init")
  }
  //io.emit("event::MagicNumber::init", )
  initGame()
  const handleNumber = event => {
    setNumber(event.target.value);
  };

  const sendNumber = () => {
    io.emit("event::MagicNumber::sendNumber", { number });
  };

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
