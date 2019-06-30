# Memory Game
###### Pokemon / FontAwesome

## Table of Contents

* [Description](#description)
* [Getting started](#getting-started)
* [Little Roadmap](#little-roadmap)
* [Contributing](#contributing)
* [Additional information](#additional-information)

## Description

This game is a quick and simple memory game based on **HTML**, **CSS** and **Javascript**.
For the main version Pokemon **SVG** files `/img` are used representing each card.
Also, there is a second / alternative version using [FontAwesome Icons](http://fontawesome.io).

#### Main features are:

 * Move counter: flipping two cards = one move

 * Star rating system: You'll start with three filled stars. These stars decrease when reaching a specific amount of moves.
 	* e.g. < 9 moves to complete the game = three stars
 	* < 11 moves = two and a half stars
 	* < 13 moves = two stars
 	* and so on

 * Timer: which starts on first click on card and finishes after game is won.

 * Reset button

### List of Pokemon:

 * Pikachu
 * Snorlax
 * Charmander
 * Bullbasaur
 * Jigglypuff
 * Psyduck
 * Squirtle
 * Meowth

###### License

Icons made by https://www.flaticon.com/packs/pokemon-go [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/)

## Getting started

#### For Pokemon Version:

```
<!-- CSS -->
<link rel="stylesheet" href="css/app.css">
<!-- script -->
<script src="js/app.js"></script>
```

#### For FontAwesome Version:

```
<!-- CSS -->
<link rel="stylesheet" href="css/app_fa.css">
<!-- script -->
<script src="js/app_fa.js"></script>
```

##### Please note:
 * Use `index.html` as a boilerpate for **Pokemon** Version.
 * Use `index_fa.html` as a boilerpate for **FontAwesome** Version.

## Little Roadmap

Both versions of the game shall be united into one site by adding a "Toggle Theme" button on the index page.

## Contributing

Hopefully more versions to toggle.
For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).

## Additional information

This project is part of my @udacity Front-End Web Developer Nanodegree.
