import React, { useState } from "react";
import "./home.css";

export default function Home() {
  const [selectedPokemon, setSelectedPokemon] = useState();

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
    <div id="home">
      <header>
        <h1>Choose your Pokémon</h1>
      </header>
      <section className="starters-container">
        {starterPokemon.map((pokemon) => {
          const myClassName =
            selectedPokemon?.id === pokemon.id ? "selected" : "";
          return (
            <div
              key={pokemon.id}
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
