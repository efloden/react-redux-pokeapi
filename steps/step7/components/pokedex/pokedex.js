import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getPokemonPage, setCurrentPageUrl } from "../../actions";
import "./pokedex.css";

function Pokedex({ pokeapi, pokedex, getPokemonPage, setCurrentPageUrl }) {
  const { pokemonResponse, isRequestPending } = pokeapi;
  const { currentPageUrl } = pokedex;

  useEffect(() => {
    getPokemonPage(currentPageUrl);
  }, [currentPageUrl, getPokemonPage]);

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
            <PokemonList
              pokemonResults={pokemonResponse.results}
              pokedex={pokedex}
            />
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
  for (let i = 0; i < 12; i++) {
    skeletonItems.push(
      <li key={i} className="skeleton-item">
        . . .
      </li>
    );
  }
  return skeletonItems;
}

function PokemonList({ pokemonResults, pokedex }) {
  return pokemonResults.map((pokemon) => {
    const pokedexNum = pokemon.url.split("/")[6];
    const discovered = pokedex.discoveredPokemon[pokedexNum];
    const capitalizedName =
      pokemon.name[0].toUpperCase() + pokemon.name.substring(1);
    return (
      <li key={pokemon.name}>
        <Link to={`/pokedex/${pokedexNum}`}>
          <img
            className={discovered && "discovered"}
            width="50px"
            height="50px"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokedexNum}.svg`}
            alt={pokemon.name}
          />
        </Link>
        <article>#{pokedexNum}</article>
        <article>{discovered ? capitalizedName : "??????"}</article>
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

const mapStateToProps = (state) => {
  return {
    pokeapi: state.pokeapi,
    pokedex: state.pokedex,
  };
};

export default connect(mapStateToProps, { getPokemonPage, setCurrentPageUrl })(
  Pokedex
);
