# Phaser Game Stub

This is a small game template to build games using the [Phaser Framework](http://phaser.io).

This is part of the [mortar](https://github.com/mozilla/mortar/) template collection for building [Open Web Apps](https://developer.mozilla.org/en-US/Apps).


## Downloading

There are a few ways to get this template:

If you use [Git](http://www.git-scm.com/):

````bash
git clone https://github.com/soapdog/mortar-phaser-game-stub.git
````

Or download the latest version in this [ZIP file](https://github.com/soapdog/mortar-phaser-game-stub/archive/master.zip).


## Usage

Start a local server to simulate accessing the hosted app from the browser, and trying the *Install* button flow.

For example:

````bash
python -m SimpleHTTPServer 8000
````

then access `localhost:8000` or `your.computer.ip:8000` (for example, `192.168.0.25`) using Firefox (Desktop or Mobile), or the Browser app in a Firefox OS simulator (or device).

You'll need to use the IP address when using a physical device. Change the port accordingly, if you're running a webserver in this port already.

## Phaser Framework

[Phaser](http://phaser.io) is a proven open source framework for creating HTML5 games. It has many features such as input control, game loops, camera control, tilemaps and more all baked in. Its a great tool to help you create your game and not focus on trivia stuff that is not related to your project or vision.


## Code walkthrough
The code is contained in three files &mdash boot.js, preloader.js, game.js &mdash each serves a different purpose and is explained below:

### boot.js
This file register our listener for the *DOMContentLoaded* event. This event will fire once all the html/css/js files are loaded.

In this file we setup the Phaser framework and register our game states. A game can have multiple game states. This stub has two states each defined in their own file.

### preload.js
This is the first game state. Its responsible for loading all the assets needed for this stub (in this case the graphic files). Once all the files are loaded, it moves to the next state.

### game.js
This another game state. It is our **gameloop** in a real game, it would be where you process user input and update your display.

Basically the **preload** state loads the resources to be used in the **game** state.

