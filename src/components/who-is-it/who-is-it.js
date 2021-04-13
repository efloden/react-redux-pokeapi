import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./who-is-it.css";

const PokedexWrapper = require("pokeapi-js-wrapper");
const P = new PokedexWrapper.Pokedex({ cacheImages: true });

export default function WhoIsIt() {
  const [pokemonResponse, setPokemonResponse] = useState(undefined);
  const [isRequestPending, setIsRequestPending] = useState(false);
  const [discovered, setDiscovered] = useState(false);

  let { pokemonId } = useParams();

  useEffect(() => {
    setIsRequestPending(true);
    P.getPokemonByName(pokemonId).then((response) => {
      setIsRequestPending(false);
      setPokemonResponse(response);
    });
  }, [pokemonId]);

  const handleGuessChange = (e) => {
    console.log(e.target.value);
    if (e.target.value.toLocaleLowerCase() === pokemonResponse.name) {
      setDiscovered(true);
    }
  };

  return (
    <div id="who-is-it">
      <header>
        <h1>Who's That Pokémon?</h1>
      </header>
      {isRequestPending || !pokemonResponse ? (
        <div>Loading...</div>
      ) : (
        <div>
          {discovered ? (
            <PokemonDetails {...pokemonResponse} />
          ) : (
            <UnknownPokemon
              {...pokemonResponse}
              handleGuessChange={handleGuessChange}
            />
          )}
        </div>
      )}
    </div>
  );
}

function UnknownPokemon({ name, id, handleGuessChange }) {
  return (
    <div>
      <div>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
          alt={name}
        />
      </div>
      <input onChange={handleGuessChange}></input>
    </div>
  );
}

function PokemonDetails({ name, id }) {
  return (
    <div>
      <img
        className={"discovered"}
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
        alt={name}
      />
      <div>It's {name}!</div>
    </div>
  );
}
