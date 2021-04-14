const defaultState = {
  // Starter pokemon discovered by default
  discoveredPokemon: {
    1: true,
    4: true,
    7: true,
  },
  currentPageUrl: "https://pokeapi.co/api/v2/pokemon?limit=12",
};

export default function PokedexReducer(state = defaultState, action) {
  switch (action.type) {
    case "ADD_DISCOVERED_POKEMON":
      return {
        ...state,
        discoveredPokemon: {
          ...state.discoveredPokemon,
          [action.payload]: true,
        },
      };
    case "SET_CURRENT_PAGE_URL":
      return {
        ...state,
        currentPageUrl: action.payload,
      };
    default:
      return state;
  }
}
