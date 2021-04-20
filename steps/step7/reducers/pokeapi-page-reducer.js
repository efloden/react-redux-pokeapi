const defaultState = {
  status: "idle",
  pokemonResponse: undefined,
};

export default function PokeAPIPageReducer(state = defaultState, action) {
  switch (action.type) {
    case "GET_POKEMON_PAGE_PENDING":
      return {
        ...state,
        status: "loading",
      };
    case "GET_POKEMON_PAGE_FULFILLED":
      return {
        ...state,
        status: "succeeded",
        pokemonResponse: action.payload.data,
      };
    case "GET_POKEMON_PAGE_REJECTED":
      return {
        ...state,
        status: "failed",
        error: action.payload,
      };
    default:
      return state;
  }
}
