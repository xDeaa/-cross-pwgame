import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { AskNickname, MagicNumber, ChooseGames } from "./components";
import { SocketProvider } from "./contexts/SocketProvider";

const App = () => {
  return (
    <SocketProvider>
      <Router>
        <Switch>
          <Route path="/" exact component={AskNickname} />
          <Route path="/games" exact component={ChooseGames} />
          <Route path="/games/MagicNumber" exact component={MagicNumber} />
        </Switch>
      </Router>
    </SocketProvider>
  );
};

export default App;
