BasicGame.Game = function(game) {};

/**
 * This is the Game game state. Its our game loop responsible for the game itself.
 *
 * In the create() function we setup the display.
 * In the update() function we do the gameloop.
 *
 * To learn more about states refer to:
 * Refer to: http://docs.phaser.io/Phaser.State.html
 */

BasicGame.Game.prototype = {
    create: function() {

        // Some constants
        this.playerSpeed = 250;
        this.ballSpeed = 220;
        this.blocksPerRow = 4;
        this.blockRows = 2;

        // Add the background
        this.add.sprite(0, 0, 'background');

        // Add the player
        this.player = this.add.sprite(160, 440, 'player');
        this.physics.arcade.enable(this.player);
        this.player.anchor.setTo(0.5, 0); //center anchor/origin to the middle of the paddle
        this.player.enableBody = true;
        this.player.body.immovable = true;
        this.player.body.collideWorldBounds = true;

        // Add ball
        this.ball = this.add.sprite(160, 240, 'ball');
        this.physics.arcade.enable(this.ball);
        this.ball.anchor.setTo(0.5, null);
        this.ball.enableBody = true;
        this.ball.body.bounce.setTo(1, 1);
        this.ball.body.velocity.x = this.ballSpeed;
        this.ball.body.velocity.y = this.ballSpeed; // <-- ball speed.
        this.ball.body.collideWorldBounds = true;


        // Blocks
        this.blocks = this.game.add.group();
        for (var line = 0; line <= this.blockRows; line++) {
            for (var row = 0; row <= this.blocksPerRow; row++) {
                var posY = (line * 30) + 40;
                var posX = (row * 50) + 40;
                console.log("Adding block at: " + posX + "," + posY)
                var temp = this.add.sprite(posX, posY, 'block');
                this.physics.arcade.enable(temp);
                temp.enableBody = true;
                temp.body.immovable = true;

                this.blocks.add(temp);
            }
        }

        // Add cursor input.
        this.cursors = this.input.keyboard.createCursorKeys()
    },

    update: function() {
        /*
        This function is called in a loop using requestAnimationFrame(). It is our game loop, our heartbeat. Every time
        it is called we process the user input and update the display.
         */


        /*
         Movement of the player using touch.

         in this case we're just moving him
         on one axis.

         The keyboard example shows two axis movement.

         To learn more about handling input refer to:
         http://docs.phaser.io/Phaser.Input.html
         */

        if (this.input.pointer1.isDown) {
            if (this.input.pointer1.worldX > 160) {
                this.player.body.velocity.x = this.playerSpeed;
            }

            if (this.input.pointer1.worldX <= 160) {
                this.player.body.velocity.x = -1 * this.playerSpeed;
            }
        }

        /*
        Moving the player using the keyboard keys.

        The move here is continuous because we apply
        a velocity to the axis.
        */

        if (this.cursors.right.isDown) {
            this.player.body.velocity.x = this.playerSpeed;
        }

        if (this.cursors.left.isDown) {
            this.player.body.velocity.x = -1 * this.playerSpeed;
        }

        /*
        Collision checking
         */

        // Tell physics system to collide the ball and the blocks
        this.game.physics.arcade.collide(this.ball, this.blocks, this.ballCollidesWithBlock);

        // Tell physics system to collide the ball and the player...
        this.game.physics.arcade.collide(this.ball, this.player);


    },

    ballCollidesWithBlock: function(sprite, block) {
        console.log("Collided with block!");
        block.kill();
    }

};
