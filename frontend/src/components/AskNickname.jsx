import React, { useState, useContext } from "react";
import { Redirect } from 'react-router-dom'
import { context } from "../contexts/SocketProvider";

const AskNickname = () => {
  const io = useContext(context);
  const [nickname, setNickname] = useState("");
  const [isLogged, setIsLogged] = useState(false);

  const handleNickname = event => {
    setNickname(event.target.value);
  };

  const sendNickname = () => {
    io.emit("event::initialize", { nickname });
    setIsLogged(true)
  };

  if (isLogged) {
    return <Redirect to="/games"/> 
  }

  return (
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
  );
};

export default AskNickname;
