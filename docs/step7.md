# Step 7

Finally, we will integrate our Redux components with the React components, making use of the Redux connect functions [mapStateToProps](https://react-redux.js.org/using-react-redux/connect-mapstate), and [mapDispatchToProps](https://react-redux.js.org/using-react-redux/connect-mapdispatch).

## Tasks

### 1 Accessing Redux store and actions in components

To access the Redux store, use the Redux `connect` function in the `who-is-it.js` and `pokedex.js` files.

```js
import { connect } from "react-redux";
```

At the bottom of each component, use [mapStateToProps](https://react-redux.js.org/using-react-redux/connect-mapstate) to select the data required from the store.

```js
const mapStateToProps = (state) => {
  return {
    pokeapiItem: state.pokeapiItem,
    pokedex: state.pokedex,
  };
};
```

Then pass it to the `connect` function as the first argument.

The second argument will be the [mapDispatchToProps](https://react-redux.js.org/using-react-redux/connect-mapdispatch), containing the Redux actions we wish to call.

For `who-is-it.js` we want to use the `addDiscoveredPokemon` and `getPokemonItem` actions.

```js
export default connect(mapStateToProps, {
  addDiscoveredPokemon,
  getPokemonItem,
})(WhoIsIt);
```

For `pokedex.js` we want to use the `getPokemonPage` and `setCurrentPageUrl` actions.

```js
export default connect(mapStateToProps, { getPokemonPage, setCurrentPageUrl })(
  Pokedex
);
```

Once connected, `pokeapiItem`, `pokedex` (store data), and `addDiscoveredPokemon`, `getPokemonItem` will be available in the components props.

### 2 Replace the React useState code with the Redux store data and actions

```js
function WhoIsIt({
  pokedex,
  pokeapiItem,
  getPokemonItem,
  addDiscoveredPokemon,
}) {
  const { pokemonResponse, status, error } = pokeapiItem;
```

```js
function Pokedex({ pokeapiPage, pokedex, getPokemonPage, setCurrentPageUrl }) {
  const { pokemonResponse, status, error } = pokeapiPage;
  const { currentPageUrl } = pokedex;
```

[<- prev step](./step6.md)
