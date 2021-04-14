import { combineReducers } from "redux";
import PokeAPIReducer from "./pokeapi-reducer";
import PokedexReducer from "./pokedex-reducer";

const rootReducer = combineReducers({
  pokeapi: PokeAPIReducer,
  pokedex: PokedexReducer,
});

export default rootReducer;
