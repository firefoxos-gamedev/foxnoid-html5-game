/**
 * This is the Game Over state. The game switch to this state once the player loses the game.
 *
 * In the create() function we setup the display.
 *
 * To learn more about states refer to:
 * Refer to: http://docs.phaser.io/Phaser.State.html
 */

GameStates.GameOver = {
    handleEvent: function(event) {
        if (event.type === "keypress") {
            document.removeEventListener("keypress", this, false);
            this.state.start("Game");
        }
    },

    create: function() {

        // Add the background
        this.add.sprite(0, 0, 'background');

        // Add the message
        this.add.sprite(20, 30, 'gameover');

        // Add the tap to play button
        this.add.sprite(20, 300, 'taptoplay');

        // Since we want to listen for any keypress to switch back
        // to the game play state its easier to handle with plain
        // javascript

        document.addEventListener("keypress", this, false);

    },

    update: function() {

    /**
     * We just want to detect a tap. If there is one, we switch back to the game
     * state and start the game again
     */

    if (this.input.pointer1.isDown) {
        this.state.start('Game');
    }

}

};