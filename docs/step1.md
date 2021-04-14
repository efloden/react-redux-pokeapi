# Step 1

Starting off the application displays three starter pokemon with some basic HTML and CSS.

We will use a file structure based on [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/) to manage React components.

Update the `home.js` component file to use render the list of starter pokemon:

```
src
│   README.md
│   app.js
|   app.css
│   ...
└───components
    └───home
            home.js
```

1. Create a `starterPokemon` array of objects with `id` and `name` parameters.

```js
const starterPokemon = [
  {
    name: "squirtle",
    id: 7,
  },
  {
    name: "bulbasaur",
    id: 1,
  },
  {
    name: "charmander",
    id: 4,
  },
];
```

2. In the render function, use the [Array.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) function to loop over the pokemon array return and the `starter-option` divs as JSX.

```js
<section className="starters-container">
  {starterPokemon.map((pokemon) => {
    return (
      <div key={pokemon.id} className="starter-option">
        <img
          width="50px"
          height="50px"
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
          alt={pokemon.name}
        />
      </div>
    );
  })}
</section>
```

:bulb: See this steps completed code in [/steps/step1/components/home/home.js](https://github.com/efloden/react-redux-pokeapi/blob/main/steps/step1/app.js)
