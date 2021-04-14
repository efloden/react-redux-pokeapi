const defaultState = {
  isRequestPending: true,
  pokemonResponse: undefined,
};

export default function PokeAPIPageReducer(state = defaultState, action) {
  switch (action.type) {
    case "GET_POKEMON_PAGE_PENDING":
      return {
        ...state,
        isRequestPending: true,
      };
    case "GET_POKEMON_PAGE_FULFILLED":
      return {
        ...state,
        isRequestPending: false,
        pokemonResponse: action.payload.data,
      };
    case "GET_POKEMON_PAGE_REJECTED":
      return {
        ...state,
        isRequestPending: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
