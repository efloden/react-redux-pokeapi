# Step 6

In this section we will introduce Redux, and use it to create some more complex features for the application.

### [Three Principles of Redux](https://redux.js.org/understanding/thinking-in-redux/three-principles)

1. Single source of truth
2. State is read-only
3. Changes are made with pure functions

### [Async Logic and Data Fetching](https://redux.js.org/tutorials/fundamentals/part-6-async-logic#redux-async-data-flow)

Using Redux as the data layer for async requests, it serves as a useful abstraction for data fetching.

### Setting up Redux

Create the following folders and file structure to hold Redux logic:

```
src
│   ...
|   index.js
│   store.js
└───actions
│       index.js
└───reducers
        index.js
        pokeapi-reducer.js
        pokedex-reducer.js
```

For this setup we will use the following Redux packages, they are allready included in this respositories package.json

```
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

- In `pokeapi-reducer`, create a reducer which will handle the PokeAPI requests.

- In `pokedex-reducer`, create a reducer which will handle global application state, including which pokemon have been discovered.

- In `reducers/index.js` use [combineReducers](https://redux.js.org/api/combinereducers) to merge the `pokedex-reducer` and `pokeapi-reducer` reducers into root reducer.

- In `actions/index.js` create actions to `getPokemonPage`, `addDiscoveredPokemon`, and `setCurrentPageUrl`

- In `store.js` [create the Redux store](https://redux.js.org/api/createstore) using the `rootReducer` from `reducers/index.js`, and the `redux-promise` and `redux-logger` middlewares.

:bulb: See this steps completed code in [/steps/step6](https://github.com/efloden/react-redux-pokeapi/blob/main/steps/step6)
