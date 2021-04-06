import React from "react";
import './App.css'
const Pokedex = require("pokeapi-js-wrapper");
const P = new Pokedex.Pokedex({ cacheImages: true });

function App() {

  return (
    <div id="app">
      <header>
        <h1>Choose your Pokémon</h1>
      </header>
      <section className="starters-container">
        <div className="starter-option">
          <img
            width="50px"
            height="50px"
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/7.svg"
            alt="Squirtle"
          />
        </div>
        <div className="starter-option">
          <img
            width="50px"
            height="50px"
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg"
            alt="Bulbasaur"
          />
        </div>
        <div className="starter-option">
          <img
            width="50px"
            height="50px"
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/4.svg"
            alt="Charmander"
          />
        </div>
      </section>
    </div>
  );
}

export default App;
