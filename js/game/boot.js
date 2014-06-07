
document.addEventListener("DOMContentLoaded", function(event)  {

    //	Create your Phaser game and inject it into the game div.

    // Portrait game orientation. Invert the values if your game is in landscape orientation
    var width = 320;
    var height = 480;

    var game = new Phaser.Game(width, height, Phaser.AUTO, "game");

    //	Add the States the game has.
    game.state.add('Preloader', BasicGame.Preloader);   // <-- Loads the assets
    game.state.add('Game', BasicGame.Game);             // <-- Game loop.

    //	Now start the Boot state.
    game.state.start('Preloader');

});