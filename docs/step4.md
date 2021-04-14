# Step 4

In this step we will create a Pokedex page, which pulls data from the open [PokeAPI](https://pokeapi.co/docs/v2).

As a public API, it is best practice to implement caching of the requests to reduce load on the service.

To implement caching, we configure the application as a [Progressive Web App](https://create-react-app.dev/docs/making-a-progressive-web-app/), utilizing a service worker in `/public/pokeapi-js-wrapper-sw`.

This service worker and the [pokeapi-js-wrapper](https://github.com/PokeAPI/pokeapi-js-wrapper) package allows us to not only cache API requests, but images served by PokeAPI on github as well.

## Tasks

### 1. In `pokedex.js` import axios

This will provide us with a Promise based HTTP client to make requests to the PokeAPI.

```js
import axios from "axios";
```

### 2. Use the React State hook [useState](https://reactjs.org/docs/hooks-state.html) to set up our required state for an API request

- `pokemonResponse`: the API response data, initialized as `undefined`
- `isRequestPending`: whether there is a current request in-flight, initialized as `false`
- `currentPageUrl`: current page URL for the request, initialized as `https://pokeapi.co/api/v2/pokemon?limit=12`

```js
const [pokemonResponse, setPokemonResponse] = useState();
const [isRequestPending, setIsRequestPending] = useState(true);
const [currentPageUrl, setCurrentPageUrl] = useState(
  `https://pokeapi.co/api/v2/pokemon?limit=12`
);
```

### 3. Use the React Effect hook [useEffect](https://reactjs.org/docs/hooks-effect.html) to make our request

The code inside the `useEffect` hook will run on the pages first load, and whenever `currentPageUrl` is updated.

In this way, we can trigger new requests later by updating `currentPageUrl` - the current page of pagination.

Store the response in `pokemonResponse` using the function `setPokemonResponse`.

```js
useEffect(() => {
  setIsRequestPending(true);
  axios.get(currentPageUrl).then((res) => {
    setPokemonResponse(res.data);
    setIsRequestPending(false);
  });
}, [currentPageUrl]);
```

Confirm the `pokemonResponse` is set to the PokeAPI `getPokemonsList` response:

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

### 4. Render the `pokemonResponse` in a list

:bulb: See this steps completed code in [/steps/step4](https://github.com/efloden/react-redux-pokeapi/blob/main/steps/step4)
