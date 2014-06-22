/**
 * This is the entrance point for our game. It defines the following things:
 *
 * - global variable GameStates: This object will hold the different game states
 * for this game. We'll document each state on their own file.
 *
 * - Initialization code that executes once the DOM is loaded. This code is responsible for registering the
 * game states and initializing the game canvas.
 *
 */


var GameStates = {}; // <-- Object to hold all our game states.


document.addEventListener("DOMContentLoaded", function(event)  {

    // Create your Phaser game and inject it into the game div.
    // For more information regarding the Phaser Game object refer to:
    // http://docs.phaser.io/Phaser.Game.html

    // Portrait game orientation. Invert the values if your game is in landscape orientation
    var width = 320;
    var height = 480;

    var game = new Phaser.Game(width, height, Phaser.CANVAS, "game");

    //	Add the States the game has.
    game.state.add('Preloader', GameStates.Preloader);   // <-- Loads the assets.
    game.state.add('Game', GameStates.Game);             // <-- Game loop (a.k.a the actual game).
    game.state.add('GameOver', GameStates.GameOver);     // <-- Game Over state.
    game.state.add('GameWin', GameStates.GameWin);       // <-- Game Win state.

    //	Now start the Preloader state.
    game.state.start('Preloader');

});