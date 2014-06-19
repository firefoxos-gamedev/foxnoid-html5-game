GameStates.Game = function(game) {};

/**
 * This is the Game game state. Its our game loop responsible for the game itself.
 *
 * In the create() function we setup the display.
 * In the update() function we do the gameloop.
 *
 * To learn more about states refer to:
 * Refer to: http://docs.phaser.io/Phaser.State.html
 */

GameStates.Game.prototype = {
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
        this.ball.body.velocity.y = this.ballSpeed;
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

         in this case we're just moving the player
         on one axis.

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
        Moving the player left and right with the arrow keys.

        The move here is continuous because we apply
        a velocity to the axis. Meaning that the player never stops
        moving, the paddle is always moving left or right.

        This cursor variable is an instance of the Keyboard Manager.
        To learn more about the keyboard refer to:
        http://docs.phaser.io/Phaser.Keyboard.html
        */

        if (this.cursors.right.isDown) {
            this.player.body.velocity.x = this.playerSpeed;
        }

        if (this.cursors.left.isDown) {
            this.player.body.velocity.x = -1 * this.playerSpeed;
        }

        /*
        Collision checking

        Phaser has three different types of physics systems depending on your needs.

        On this game we're using the "Arcade Physics" system which is the simplest one. This system
        gives us all we need for our arcade game without being hard on performance so it is a good
        match for mobile devices with low specs.

        To learn more about the Arcade Physics refer to:
        http://docs.phaser.io/Phaser.Physics.Arcade.html

         */

        // Tell physics system to collide the ball and the blocks, if they collide we call the method
        // ballCollidesWithBlock as a callback.
        this.game.physics.arcade.collide(this.ball, this.blocks, this.ballCollidesWithBlock);

        // Tell physics system to collide the ball and the player... this check has no callback because we don't
        // need to run any routine when the ball hits the player, we just want it to bounce and thats handled
        // automatically by the physics system.
        this.game.physics.arcade.collide(this.ball, this.player);


    },

    ballCollidesWithBlock: function(sprite, block) {
        console.log("Collided with block!");
        block.kill();
    }

};
