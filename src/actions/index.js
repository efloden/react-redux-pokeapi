import axios from "axios";

export function getPokemonPage(url) {
  const request = axios.get(url);
  return {
    type: "GET_POKEMON_PAGE",
    payload: request,
  };
}

export function addDiscoveredPokemon(pokemonNum) {
  return {
    type: "ADD_DISCOVERED_POKEMON",
    payload: pokemonNum,
  };
}

export function setCurrentPageUrl(pageUrl) {
  return {
    type: "SET_CURRENT_PAGE_URL",
    payload: pageUrl,
  };
}
