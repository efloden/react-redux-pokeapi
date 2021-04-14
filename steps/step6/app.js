import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./components/home/home";
import Pokedex from "./components/pokedex/pokedex";
import WhoIsIt from "./components/who-is-it/who-is-it";
import "./app.css";

function App() {
  return (
    <Router>
      <div id="app">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/pokedex">Pokedex</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
        <Switch>
          <Route path={`/pokedex/:pokemonId`}>
            <WhoIsIt />
          </Route>
          <Route path="/pokedex">
            <Pokedex />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
