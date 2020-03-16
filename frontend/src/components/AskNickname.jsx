import React, { useState, useContext } from "react";
import { Redirect } from 'react-router-dom'
import { contextSocket } from "../contexts/SocketProvider";

const AskNickname = () => {
  const io = useContext(contextSocket);
  const [nickname, setNickname] = useState("");
  const [isLogged, setIsLogged] = useState(false);

  const handleNickname = event => {
    setNickname(event.target.value);
  };

  const sendNickname = () => {
    io.emit("event::setNickname", { nickname });
    setIsLogged(true)
  };

  if (isLogged) {
    return <Redirect to="/games" />
  }

  return (
    <section className="hero is-fullheight is-light">
      <div className="hero-body">
        <div className="container">
          <header className="bd-index-header">
            <div className="field">
              <div className="control">
                <input className="input" onChange={handleNickname} value={nickname} />
              </div>
              <div className="control">
                <a className="button is-info" onClick={sendNickname}>
                  Send
               </a>
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

export default AskNickname;
