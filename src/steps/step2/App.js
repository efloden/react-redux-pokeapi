import React, { useState } from "react";
import "./App.css";

const Pokedex = require("pokeapi-js-wrapper");
const P = new Pokedex.Pokedex({ cacheImages: true });

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(undefined);

  const starterPokemon = [
    {
      name: "squirtle",
      id: 7,
    },
    {
      name: "bulbasaur",
      id: 1,
    },
    {
      name: "charmander",
      id: 4,
    },
  ];

  return (
    <div id="app">
      <header>
        <h1>Choose your Pokémon</h1>
      </header>
      <section className="starters-container">
        {starterPokemon.map((pokemon) => {
          const myClassName =
            selectedPokemon?.id === pokemon.id ? "selected" : "";
          return (
            <div
              className={`starter-option ${myClassName}`}
              onClick={() => setSelectedPokemon(pokemon)}
            >
              <img
                width="50px"
                height="50px"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
                alt={pokemon.name}
              />
            </div>
          );
        })}
      </section>
      {selectedPokemon && (
        <section className="selected-pokemon-container">
          <span>
            You have selected <b>{selectedPokemon.name}</b>!
          </span>
        </section>
      )}
    </div>
  );
}

export default App;
