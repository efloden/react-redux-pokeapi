# Step 3

Now we have a basic page where we can select one of three starter pokemon.

Lets make a new page where we can view all pokemon, we can handle the routing for this with [React Router](https://reactrouter.com/).

In this step we will create a file structure based on [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/) to manage our new React components and their CSS.

1. Install the react-router-dom package with NPM: `npm install react-router-dom`
2. Update your file layout to manage components in separate folders, we will have one component for each page: `home` and `pokedex`.

```
src
│   README.md
│   app.js
|   app.css
│   ...
└───components
    │
    └───home
    │       home.js
    │       home.css
    └───pokedex
            pokedex.js
```

3. Copy the code from your `app.js` file to `home.js` and rename the component name to `Home`.
4. In the `pokedex.js` file, create a [React Functional Component](https://reactjs.org/docs/components-and-props.html#function-and-class-components) that simply returns `<h1>Pokédex</h1>` for now.
5. In `app.js` import the `Home` and `Pokedex` components
6. Then in `app.js` follow the React Router [Basic Router](https://reactrouter.com/web/guides/quick-start/1st-example-basic-routing) example to serve the `Home` component on the base path `"/"`, and `Pokedex` on the path `"/pokedex"`
7. Test your router to ensure your `Home` and `Pokedex` components display when changing routes.

:bulb: See this steps completed code in [/src/docs/steps/step3](https://github.com/efloden/react-redux-pokeapi/blob/main/src/steps/step3)
