import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { connect } from "react-redux";
import { addDiscoveredPokemon } from ".././../actions";
import axios from "axios";
import "./who-is-it.css";

function WhoIsIt({ addDiscoveredPokemon }) {
  const [pokemonResponse, setPokemonResponse] = useState(undefined);
  const [isRequestPending, setIsRequestPending] = useState(false);
  const [discovered, setDiscovered] = useState(false);

  let { pokemonId } = useParams();

  useEffect(() => {
    setIsRequestPending(true);
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`).then((res) => {
      setIsRequestPending(false);
      setPokemonResponse(res.data);
    });
  }, [pokemonId]);

  const handleGuessChange = (guess) => {
    if (guess.toLocaleLowerCase() === pokemonResponse.name) {
      setDiscovered(true);
      addDiscoveredPokemon(pokemonId);
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

function PokemonDetails({ name, id }) {
  const capitalizedName = name[0].toUpperCase() + name.substring(1);
  return (
    <figure>
      <img
        className={"discovered"}
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
        alt={name}
      />
      <figcaption>It's {capitalizedName}!</figcaption>
      <Link to="/pokedex">Back to list</Link>
    </figure>
  );
}

const mapStateToProps = (state) => {
  return {
    pokedex: state.pokedex,
  };
};

export default connect(mapStateToProps, { addDiscoveredPokemon })(WhoIsIt);
