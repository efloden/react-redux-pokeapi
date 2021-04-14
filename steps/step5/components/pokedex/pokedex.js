import React, { useState, useEffect } from "react";
import axios from "axios";
import "./pokedex.css";

const LIMIT = 12;

export default function Pokedex() {
  const [pokemonResponse, setPokemonResponse] = useState();
  const [isRequestPending, setIsRequestPending] = useState(true);
  const [currentPageUrl, setCurrentPageUrl] = useState(
    `https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}`
  );

  useEffect(() => {
    setIsRequestPending(true);
    axios.get(currentPageUrl).then((res) => {
      setPokemonResponse(res.data);
      setIsRequestPending(false);
    });
  }, [currentPageUrl]);

  const gotoPrevPage = () => {
    if (pokemonResponse.previous) {
      setCurrentPageUrl(pokemonResponse.previous);
    }
  };

  const gotoNextPage = () => {
    if (pokemonResponse.next) {
      setCurrentPageUrl(pokemonResponse.next);
    }
  };

  return (
    <div id="pokedex">
      <header>
        <h1>Pokédex</h1>
      </header>
      <main>
        <ul>
          {isRequestPending ? (
            <LoadingSkeleton />
          ) : (
            <PokemonList pokemonResults={pokemonResponse.results} />
          )}
        </ul>
      </main>
      <Pagination
        gotoNextPage={gotoNextPage}
        gotoPrevPage={gotoPrevPage}
        isRequestPending={isRequestPending}
      />
    </div>
  );
}

function LoadingSkeleton() {
  const skeletonItems = [];
  for (let i = 0; i < LIMIT; i++) {
    skeletonItems.push(
      <li key={i} className="skeleton-item">
        . . .
      </li>
    );
  }
  return skeletonItems;
}

function PokemonList({ pokemonResults }) {
  return pokemonResults.map((pokemon) => {
    const pokedexNum = pokemon.url.split("/")[6];
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
        <article>#{pokedexNum}</article>
        <article>{pokemon.name}</article>
      </li>
    );
  });
}

function Pagination({ gotoPrevPage, gotoNextPage, isRequestPending }) {
  return (
    <footer className="pagination">
      <button onClick={gotoPrevPage} disabled={isRequestPending}>
        Previous
      </button>
      <button onClick={gotoNextPage} disabled={isRequestPending}>
        Next
      </button>
    </footer>
  );
}
