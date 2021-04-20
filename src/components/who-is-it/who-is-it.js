import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { connect } from "react-redux";
import { addDiscoveredPokemon, getPokemonItem } from ".././../actions";
import "./who-is-it.css";

function WhoIsIt({
  pokedex,
  pokeapiItem,
  getPokemonItem,
  addDiscoveredPokemon,
}) {
  const { pokemonResponse, status, error } = pokeapiItem;

  let { pokemonId } = useParams();

  const discovered = pokedex.discoveredPokemon[pokemonId];

  useEffect(() => {
    getPokemonItem(pokemonId);
  }, [getPokemonItem, pokemonId]);

  const handleGuessChange = (guess) => {
    if (guess.toLocaleLowerCase() === pokemonResponse.name) {
      addDiscoveredPokemon(pokemonId);
    }
  };

  let content;

  if (status === "loading") {
    content = <div className="loader">Loading...</div>;
  } else if (status === "succeeded") {
    if (discovered) {
      content = <PokemonDetails {...pokemonResponse} />;
    } else {
      content = (
        <UnknownPokemon
          {...pokemonResponse}
          handleGuessChange={handleGuessChange}
        />
      );
    }
  } else if (status === "failed") {
    content = <div>{error}</div>;
  }

  return (
    <div id="who-is-it">
      <header>
        <h1>Who's That Pokémon?</h1>
      </header>
      {content}
    </div>
  );
}

function UnknownPokemon({ name, id, handleGuessChange }) {
  return (
    <div className="unknown-pokemon">
      <figure>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
          alt={name}
        />
      </figure>
      <section>
        <input onChange={(e) => handleGuessChange(e.target.value)}></input>
      </section>
      <section>
        <button onClick={() => handleGuessChange(name)}>I don't know!</button>
      </section>
    </div>
  );
}

function PokemonDetails({ name, id, types }) {
  const capitalizedName = name[0].toUpperCase() + name.substring(1);
  return (
    <figure>
      <img
        className={"discovered"}
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
        alt={name}
      />
      <figcaption>It's {capitalizedName}!</figcaption>
      <div>
        {types.map((type, index) => {
          return (
            <span key={index} className={"pokemon-type " + type.type.name}>
              {type.type.name}
            </span>
          );
        })}
      </div>
      <Link to="/pokedex">Back to list</Link>
    </figure>
  );
}

const mapStateToProps = (state) => {
  return {
    pokeapiItem: state.pokeapiItem,
    pokedex: state.pokedex,
  };
};

export default connect(mapStateToProps, {
  addDiscoveredPokemon,
  getPokemonItem,
})(WhoIsIt);
