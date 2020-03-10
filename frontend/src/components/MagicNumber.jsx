import React, { useState, useContext } from "react";
import { context } from "../contexts/SocketProvider";

const MagicNumber = () => {
    const io = useContext(context)
    const [number, setNumber] = useState("");
    const initGame = () =>  {
        io.emit("event::MagicNumber::init")
    }

    initGame()
    const handleNumber = event => {
        setNumber(event.target.value);
    };
  
    const sendNumber = () => {
      io.emit("event::MagicNumber::sendNumber", { number });
    };
  
    return (
      <div className="field">
        <div className="control">
          <input className="input" onChange={handleNumber} value={number} />
        </div>
        <div className="control">
          <a className="button is-info" onClick={sendNumber}>
            Send
          </a>
        </div>
      </div>
    );
  };

export default MagicNumber;
