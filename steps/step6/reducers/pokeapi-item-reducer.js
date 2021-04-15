const defaultState = {
  isRequestPending: true,
  pokemonResponse: undefined,
};

export default function PokeAPIItemReducer(state = defaultState, action) {
  switch (action.type) {
    case "GET_POKEMON_ITEM_PENDING":
      return {
        ...state,
        isRequestPending: true,
      };
    case "GET_POKEMON_ITEM_FULFILLED":
      return {
        ...state,
        isRequestPending: false,
        pokemonResponse: action.payload.data,
      };
    case "GET_POKEMON_ITEM_REJECTED":
      return {
        ...state,
        isRequestPending: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
