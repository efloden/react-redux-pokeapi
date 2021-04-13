# Step 4

In this step we will create a Pokedex page, which pulls data from the open [PokeAPI](https://pokeapi.co/docs/v2).

As a public API, it is best practice to implement caching of the requests to reduce load on the service.

To implement caching, we configure the application as a [Progressive Web App](https://create-react-app.dev/docs/making-a-progressive-web-app/), utilizing a service worker in `/public/pokeapi-js-wrapper-sw`.

This service worker and the [pokeapi-js-wrapper](https://github.com/PokeAPI/pokeapi-js-wrapper) package allows us to not only cache API requests, but images served by PokeAPI on github as well.

### 1. Install the pokeapi-js-wrapper package with npm.

`npm install pokeapi-js-wrapper`

### 2. In `pokedex.js`, import an instantiate the pokeapi wrapper with `cacheImages: true`

This will provide us with an interface to make requests to the PokeAPI, and ensure our requests (including images) are cached.

```js
const PokedexWrapper = require("pokeapi-js-wrapper");
const P = new PokedexWrapper.Pokedex({ cacheImages: true });
```

### 3. Use the React State hook [useState](https://reactjs.org/docs/hooks-state.html) to set up our required state for an API request.

- `pokemonResponse`: the API response data, initialized as `undefined`
- `isRequestPending`: whether there is a current request in-flight, initialized as `false`
- `interval`: pagination interval for the request, initialized as `{ offset: 0, limit: 12 }`

```js
const [pokemonResponse, setPokemonResponse] = useState(undefined);
const [isRequestPending, setIsRequestPending] = useState(false);
const [interval, setInterval] = useState({ offset: 0, limit: 12 });
```

### 4. Use the React Effect hook [useEffect](https://reactjs.org/docs/hooks-effect.html) to make our request.

The code inside the `useEffect` hook will run on the pages first load, and whenever `interval` is updated.

In this way, we can trigger new requests later by updating `interval.offset` - the current page of pagination.

Store the response in `pokemonResponse` using the function `setPokemonResponse`.

```js
useEffect(() => {
    setIsRequestPending(true);
    P.getPokemonsList(interval).then((response) => {
      setIsRequestPending(false);
      setPokemonResponse(response);
    });
  }, [interval]);
}, []);
```

Confirm tour `pokemonResponse` is set to the PokeAPI `getPokemonsList` response:

```json
{
  "count": 1118,
  "next": "https://pokeapi.co/api/v2/pokemon/?offset=12&limit=12",
  "previous": null,
  "results": [
    {
      "name": "bulbasaur",
      "url": "https://pokeapi.co/api/v2/pokemon/1/"
    }
    // ... 11 more results
  ]
}
```

### 5. Render the `pokemonResponse` in a list.

:bulb: See this steps completed code in [/steps/step4](https://github.com/efloden/react-redux-pokeapi/blob/main/steps/step4)
