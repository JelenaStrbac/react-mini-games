import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import MasterMind from "./masterMind/containers/MasterMind";
import Home from "./shared/Home";
import { GlobalStyles } from "./shared/themes/globalStyle";
import Game from "./ticTac/containers/Game";

const App = () => {
  return (
    <Router>
      <GlobalStyles />
      <div className="App" style={styles.app}>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/tic-tac-toe">
            <Game />
          </Route>
          <Route path="/mastermind">
            <MasterMind />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

const styles = {
  app: {
    width: "100vw",
    height: "100vh",
  },
};

export default App;
