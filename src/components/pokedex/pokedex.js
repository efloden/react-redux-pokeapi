import React, { useState, useEffect } from "react";
import "./pokedex.css";

const PokedexWrapper = require("pokeapi-js-wrapper");
const P = new PokedexWrapper.Pokedex({ cacheImages: true });

export default function Pokedex() {
  const [pokemonResponse, setPokemonResponse] = useState(undefined);
  const [isRequestPending, setIsRequestPending] = useState(false);
  const [interval, setInterval] = useState({ offset: 0, limit: 12 });

  useEffect(() => {
    setIsRequestPending(true);
    P.getPokemonsList(interval).then((response) => {
      setIsRequestPending(false);
      setPokemonResponse(response);
    });
  }, [interval]);

  return (
    <div id="pokedex">
      <header>
        <h1>Pokédex</h1>
      </header>
      <ul>
        {isRequestPending || !pokemonResponse ? (
          <LoadingSkeleton interval={interval} />
        ) : (
          <PokemonList pokemonResponse={pokemonResponse} interval={interval} />
        )}
      </ul>
      <Pagination
        interval={interval}
        setInterval={setInterval}
        pokemonResponse={pokemonResponse}
        isRequestPending={isRequestPending}
      />
    </div>
  );
}

function LoadingSkeleton({ interval }) {
  const skeletonItems = [];
  for (let i = 0; i < interval.limit; i++) {
    skeletonItems.push(
      <li key={i} className="skeleton-item">
        . . .
      </li>
    );
  }
  return skeletonItems;
}

function PokemonList({ pokemonResponse, interval }) {
  return pokemonResponse.results.map((pokemon, index) => {
    const pokedexNum = index + interval.offset + 1;
    return (
      <li key={pokemon.name}>
        <a href={`/pokedex/${pokedexNum}`}>
          <img
            width="50px"
            height="50px"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokedexNum}.svg`}
            alt={pokemon.name}
          />
        </a>
        <div>#{pokedexNum}</div>
        <div>{pokemon.name}</div>
      </li>
    );
  });
}

function Pagination({
  interval,
  setInterval,
  pokemonResponse,
  isRequestPending,
}) {
  const gotoPrevPage = () => {
    setInterval({
      offset: Math.max(0, interval.offset - interval.limit),
      limit: interval.limit,
    });
  };

  const gotoNextPage = () => {
    setInterval({
      offset: interval.offset + interval.limit,
      limit: interval.limit,
    });
  };

  const currentPage = interval.offset / interval.limit + 1;
  const totalPages = Math.ceil(pokemonResponse?.count / interval.limit);

  return (
    <div className="pagination">
      <div>
        Page {currentPage} of {totalPages}
      </div>
      <button onClick={gotoPrevPage}>Previous</button>
      <button onClick={gotoNextPage} disabled={isRequestPending}>
        Next
      </button>
    </div>
  );
}
