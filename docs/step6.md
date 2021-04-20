# Step 6

In this section we will introduce Redux, and use it to create some more complex features for the application.

### [Three Principles of Redux](https://redux.js.org/understanding/thinking-in-redux/three-principles)

1. Single source of truth
2. State is read-only
3. Changes are made with pure functions

### [Async Logic and Data Fetching](https://redux.js.org/tutorials/essentials/part-5-async-logic)

Using Redux as the data layer for async requests, it serves as a useful abstraction for data fetching.

We can track the progress of requests across four different states, and handle these acordingly in our application.

1. `idle` - the request has not begun
2. `loading` - the request is still pending
3. `succeeded` - the request was successful
4. `error` - the request failed

### Setting up Redux

Create the following folders and file structure to hold Redux logic:

```bash
src
│   ...
|   index.js
│   store.js
└───actions
│       index.js
└───reducers
        index.js
        pokeapi-item-reducer.js
        pokedex-page-reducer.js
        pokedex-reducer.js
```

For this setup we will use the following Redux packages, they are allready included in this respositories [package.json](../package.json) file.

```bash
react-redux
redux
redux-logger
redux-promise-middleware
```

In `index.js` import `Provider` from `react-redux`

```js
import { Provider } from "react-redux";
```

Surrond `<App />` with the `Provider`. This will make our Redux state globally available throughout the application.

```js
<Provider store={store}>
  <App />
</Provider>
```

- In `pokeapi-page-reducer`, create a reducer functin which will handle the PokeAPI requests for a paginated list of pokemon.

```js
const defaultState = {
  status: "idle",
  pokemonResponse: undefined,
  error: undefined,
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
```

- In `pokeapi-item-reducer`, create a reducer which will handle the PokeAPI requests for individual pokemon.

```js
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
```

- In `pokedex-reducer`, create a reducer which will handle application state, including which pokemon have been discovered and the current page of pagination.

```js
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
```

- In `reducers/index.js` use [combineReducers](https://redux.js.org/api/combinereducers) to merge the `pokedex-reducer`, `pokeapi-page-reducer`, and `pokeapi-item-reducer` reducers into root reducer.

```js
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
```

- In `actions/index.js` create actions to `getPokemonPage`, `getPokemonItem`, `addDiscoveredPokemon`, and `setCurrentPageUrl`

```js
import axios from "axios";

export function getPokemonPage(url) {
  const request = axios.get(url);
  return {
    type: "GET_POKEMON_PAGE",
    payload: request,
  };
}

export function getPokemonItem(id) {
  const request = axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  return {
    type: "GET_POKEMON_ITEM",
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
```

- In `store.js` [create the Redux store](https://redux.js.org/api/createstore) using the `rootReducer` from `reducers/index.js`, and the `redux-promise` and `redux-logger` middlewares.

```js
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import promise from "redux-promise-middleware";
import logger from "redux-logger";

const middlewares = [promise];

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
```

:bulb: See this steps completed code in [/steps/step6](https://github.com/efloden/react-redux-pokeapi/blob/main/steps/step6)

[<- prev step](./step5.md) [next step ->](./step7.md)
