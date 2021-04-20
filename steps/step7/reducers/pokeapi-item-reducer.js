const defaultState = {
  status: "idle",
  pokemonResponse: undefined,
  error: undefined,
};

export default function PokeAPIItemReducer(state = defaultState, action) {
  switch (action.type) {
    case "GET_POKEMON_ITEM_PENDING":
      return {
        ...state,
        status: "loading",
      };
    case "GET_POKEMON_ITEM_FULFILLED":
      return {
        ...state,
        status: "succeeded",
        pokemonResponse: action.payload.data,
      };
    case "GET_POKEMON_ITEM_REJECTED":
      return {
        ...state,
        status: "failed",
        error: action.payload,
      };
    default:
      return state;
  }
}
