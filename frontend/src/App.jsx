import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import {Home, AskNickname, MagicNumber, ChooseGames} from "./components";
import { SocketProvider } from "./contexts/SocketProvider";

const App = () => {
  return (
    <section className="hero is-fullheight is-light">
        <div className="hero-head">
            <div className="container">
            <div className="tabs is-centered">
                <ul>
                <li>
                    <a>PWA Games</a>
                </li>
                </ul>
            </div>
            </div>
        </div>

        <div className="hero-body">
            <div className="container">
            <header className="bd-index-header">
            <SocketProvider>
              <Router>
                  <Switch>
                    <Route path="/" exact component={AskNickname}/>
                    <Route path="/games" exact component={ChooseGames}/>
                    <Route path="/games/MagicNumber" exact component={MagicNumber}/>
                  </Switch>
              </Router>
            </SocketProvider>
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

export default App;
