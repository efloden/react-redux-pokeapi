# Step 5

In this step we will re-create the popular mini-game "Who's that pokemon?" with a component that hides the pokemon details until the user can guess it's name.

## Tasks

### 1. Create a new component folder and files for a `WhoIsIt` component

```
src
│   README.md
│   app.js
|   app.css
│   ...
└───components
    └───who-is-it
            who-is-it.js
            who-is-it.css
```

### 2. Use the React State hook [useState](https://reactjs.org/docs/hooks-state.html) to set up our required state for an API request

In `who-is-it.js` create a react functional component with similar states to the previous `pokedex` component for creating an API request:

```js
export default function WhoIsIt() {
  const [pokemonResponse, setPokemonResponse] = useState(undefined);
  const [isRequestPending, setIsRequestPending] = useState(true);
  return <div id="who-is-it" />;
}
```

### 3. Use the react-router libraries useParams hook to get a pokemon id from the route param

```js
import { useParams } from "react-router-dom";
// Then in the component body:
let { pokemonId } = useParams();
```

### 4. Now use this pokemonId to fetch the pokemon details from the pokeapi

```js
useEffect(() => {
  setIsRequestPending(true);
  axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`).then((res) => {
    setIsRequestPending(false);
    setPokemonResponse(res.data);
  });
}, [pokemonId]);
```

### 5. Create a PokemonDetails component in the same file to display the pokemon details returned from the pokeapi

```js
function PokemonDetails({ name, id }) {
  return (
    <figure>
      <img
        className={"discovered"}
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
        alt={name}
      />
      <figcaption>It's {name}!</figcaption>
    </figure>
  );
}
```

### 6. Create an UnkownPokemon component to display when the user has not "discovered" a pokemon

It will take a `handleGuessChange` function, `name` and `id` (from `pokemonResponse`) as props.

Create the `handleGuessChange` function in the parent WhoIsIt component componet to pass down, and a `dicovered` state to track.

```js
const [discovered, setDiscovered] = useState(false);
const handleGuessChange = (guess) => {
  if (guess.toLocaleLowerCase() === pokemonResponse.name) {
    setDiscovered(true);
  }
};
```

```js
function UnknownPokemon({ name, id, handleGuessChange }) {
  return (
    <div className="unknown-pokemon">
      <figure>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
          alt={name}
        />
      </figure>
      <section>
        <input onChange={(e) => handleGuessChange(e.target.value)}></input>
      </section>
      <section>
        <button onClick={() => handleGuessChange(name)}>I don't know!</button>
      </section>
    </div>
  );
}
```

### 7. Complete the WhoIsIt component

Write your JSX to return a Pending state if `isRequestPending`, the `<PokemonDetails>` component if `discovered` is true, otherwise the `<UnknownPokemon>` component.

```js
return (
  <div id="who-is-it">
    <header>
      <h1>Who's That Pokémon?</h1>
    </header>
    {isRequestPending ? (
      <div>Loading...</div>
    ) : (
      <div>
        {discovered ? (
          <PokemonDetails {...pokemonResponse} />
        ) : (
          <UnknownPokemon
            {...pokemonResponse}
            handleGuessChange={handleGuessChange}
          />
        )}
      </div>
    )}
  </div>
);
```

:bulb: See this steps completed code in [/steps/step5](https://github.com/efloden/react-redux-pokeapi/blob/main/steps/step5)

[<- prev step](./step4.md) [next step ->](./step6.md)
