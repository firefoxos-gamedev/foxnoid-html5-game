
/**
 * This is the Preloader game state. It is the first to run. It loads all the assets used by the game.
 */


GameStates.Preloader = {

    /*
    Game states have many functions that will be called at different stages of its lifecycle.

    You can check these methods at:
    - http://docs.phaser.io/Phaser.State.html#toc21

    In this case here:
    - preload(): will be called to load our game assets. Once loaded they are cached and any
    other game state may use them.
    - update(): this is the gameloop function. I will be called using requestAnimationFrame() in a loop
    until we do something to exit. In this case we switch to the Game state.
     */

    preload: function() {
        this.load.image('background', 'assets/background.jpg');
        this.load.image('gameover', 'assets/gameover.png');
        this.load.image('gamewin', 'assets/gamewin.png');
        this.load.image('taptoplay', 'assets/taptoplay.png');
        this.load.image('player', 'assets/player.png');
        this.load.image('ball', 'assets/ball.png');
        this.load.image('block', 'assets/block.png');

    },
    create: function(){
        this.input.maxPointers = 1;
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        if(!this.game.device.desktop && !this.isFirefoxOS) {
            this.scale.forceOrientation(true, false, 'screenRotate');
        }
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.setScreenSize(true);
        this.state.start('Game');
    },
    isFirefoxOS: function(){
        return (!!"mozApps" in navigator && navigator.userAgent.search("Mobile")) != -1;
    }
};