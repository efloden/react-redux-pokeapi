import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getPokemonPage, setCurrentPageUrl } from "../../actions";
import "./pokedex.css";

function Pokedex({ pokeapiPage, pokedex, getPokemonPage, setCurrentPageUrl }) {
  const { pokemonResponse, status, error } = pokeapiPage;
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

  let content;

  if (status === "loading") {
    content = <LoadingSkeleton />;
  } else if (status === "succeeded") {
    content = (
      <PokemonList pokemonResults={pokemonResponse.results} pokedex={pokedex} />
    );
  } else if (status === "failed") {
    content = <div>{error}</div>;
  }

  return (
    <div id="pokedex">
      <header>
        <h1>Pokédex</h1>
      </header>
      <main>
        <ul>{content}</ul>
      </main>
      <Pagination
        gotoNextPage={gotoNextPage}
        gotoPrevPage={gotoPrevPage}
        status={status}
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
        <article>{discovered ? pokemon.name : "??????"}</article>
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
    pokeapiPage: state.pokeapiPage,
    pokedex: state.pokedex,
  };
};

export default connect(mapStateToProps, { getPokemonPage, setCurrentPageUrl })(
  Pokedex
);
