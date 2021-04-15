import { combineReducers } from "redux";
import PokeAPIItemReducer from "./pokeapi-item-reducer";
import PokeAPIPageReducer from "./pokeapi-page-reducer";
import PokedexReducer from "./pokedex-reducer";

const rootReducer = combineReducers({
  pokeapiItem: PokeAPIItemReducer,
  pokeapiPage: PokeAPIPageReducer,
  pokedex: PokedexReducer,
});

export default rootReducer;
