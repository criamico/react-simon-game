# FCC-Simon-Game
An attempt of implementing the simon game on react


## Installation and use
Grab the npm version specified in .nvmrc:
`nvm use`

Install npm dependencies:

`npm install`

To run in dev mode:

`npm run dev`

This enables the server to run on `http://localhost:8080/`.

When a file changes the server automatically reloads the page on the browser.


Since in dev mode ESLint is enabled, warnings are printed on the console but errors stop the compilation.

To generate the production build:

`npm build`
bundle.js and main.css are minified and deployed in /prod folder
