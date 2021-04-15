# Step 2

Now the application should be rendering a `starterPokemon` array dynamically with JSX.

Next let's make it possible to select a pokemon, and display that selected pokemon's name.

For this we can use the React state management `useState` hook to keep track of which pokemon is selected, to render the selected pokemons name.

1. Import the `useState` hook from React at the top of the App.js file.

2. With the `useState` hook, create a state variable `selectedPokemon`, and update function `setSelectedPokemon`, it will be initialized as `undefined`.

3. Create an `onClick` handler on the `starter-option` div, have it call the `setSelectedPokemon` function with the `pokemon` as an argument.

4. If a pokemon is selected:
   - Underneath the `starters-container` section, render the `selectedPokemon` name.
   - Add a `selected` class to the corresponding pokemon's `starter-option` div.

:bulb: Make sure to read the [React useState Documentation](https://reactjs.org/docs/hooks-state.html)

:bulb: See this steps completed code in [/steps/step2/app.js](https://github.com/efloden/react-redux-pokeapi/blob/main/steps/step2/app.js)

[<- prev step](./step1.md) [next step ->](./step3.md)
