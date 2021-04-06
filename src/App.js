import React from 'react'

const Pokedex = require("pokeapi-js-wrapper")
const P = new Pokedex.Pokedex({ cacheImages: true })

function App() {
  return (
    <div id="app">
      <img
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg"
        alt="Pikachu"
      />
      <div>
        The above image is served (once cached) by the local <i>pokeapi-js-wrapper-sw.js</i> SW. Check it out in the Developer Console (F12) by looking at the Network Panel and also at the Application Panel.
      </div>
    </div>
  );
}

export default App;
