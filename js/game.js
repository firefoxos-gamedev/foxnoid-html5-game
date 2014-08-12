/**
 * This is the Game game state. Its our game loop responsible for the game itself.
 *
 * In the create() function we setup the display.
 * In the update() function we do the gameloop.
 *
 * To learn more about states refer to:
 * Refer to: http://docs.phaser.io/Phaser.State.html
 */

GameStates.Game = {
    resetBall: function() {
        this.ball.reset(160, 240);
        this.ball.body.velocity.x = this.ballSpeed;
        this.ball.body.velocity.y = this.ballSpeed;
    },

    initWorld: function() {
        // Some constants
        this.playerSpeed = 250;
        this.ballSpeed = 220;
        this.blocksPerRow = 5;
        this.blockRows = 4;
        this.playerLives = 13;
        this.currentLevel = 0;

        // Add the background
        this.add.sprite(0, 0, 'background');

        // Add keyboard input.
        // This call creates and returns an object containing 4 hotkeys for Up, Down, Left and Right.
        this.cursors = this.input.keyboard.createCursorKeys();
    },


    addPlayer: function () {
        // Add the player
        this.player = this.add.sprite(160, 440, 'player');
        this.physics.arcade.enable(this.player);
        this.player.anchor.setTo(0.5, 0); //center anchor/origin to the middle of the paddle
        this.player.enableBody = true;
        this.player.body.immovable = true;
        this.player.body.collideWorldBounds = true;


        // Add the display of player lives
        this.livesDisplay = this.add.text(10, 8, "Lives: " + this.playerLives, {
            fill: "white",
            fontSize: 12
        });
    },

    addBall: function () {
        // Add ball
        this.ball = this.add.sprite(160, 240, 'ball');
        this.physics.arcade.enable(this.ball);
        this.ball.anchor.setTo(0.5, null);
        this.ball.enableBody = true;
        this.ball.body.bounce.setTo(1, 1);
        this.ball.body.velocity.x = this.ballSpeed;
        this.ball.body.velocity.y = this.ballSpeed;
        this.ball.body.collideWorldBounds = true;
    },

    addBlocks: function () {
        var level = levels[this.currentLevel];
        var blockNum = 0;

        // do not create the blocks group
        // if it is already present.
        if (!this.blocks) {
            this.blocks = this.game.add.group();
        }

        for (var line = 0; line <= this.blockRows - 1; line++) {
            for (var row = 0; row <= this.blocksPerRow - 1; row++) {
                var posY = (line * 30) + 40;
                var posX = (row * 50) + 40;

                if (level[blockNum] === 1) {
                    var temp = this.add.sprite(posX, posY, 'block');
                    this.physics.arcade.enable(temp);
                    temp.enableBody = true;
                    temp.body.immovable = true;

                    this.blocks.add(temp);
                }

                blockNum += 1;
            }
        }
    },

    create: function() {

        this.initWorld();
        this.addPlayer();
        this.addBall();
        this.addBlocks();
    },

    checkHitWithBlocks: function () {
        // Tell physics system to collide the ball and the blocks, if they collide we call the method
        // ballCollidesWithBlock as a callback.
        this.game.physics.arcade.collide(this.ball, this.blocks, this.ballCollidesWithBlock);
    },

    checkHitWithPlayer: function () {
        // Tell physics system to collide the ball and the player... this check has no callback because we don't
        // need to run any routine when the ball hits the player, we just want it to bounce and thats handled
        // automatically by the physics system.
        this.game.physics.arcade.collide(this.ball, this.player);
    },

    handleTouchInput: function () {
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
    },

    handleKeyboardInput: function () {
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
    },

    checkGameWin: function () {
        if (this.blocks.countLiving() === 0) {
            if (this.currentLevel === levels.length - 1) {
                this.state.start("GameWin");
            } else {
                this.currentLevel++;
                this.addBlocks();
                this.resetBall();
            }
        }
    },

    update: function() {
        /*
        This function is called in a loop using requestAnimationFrame(). It is our game loop, our heartbeat. Every time
        it is called we process the user input and update the display.
         */
        this.handleTouchInput();
        this.handleKeyboardInput();
        /*
        Collision checking

        Phaser has three different types of physics systems depending on your needs.

        On this game we're using the "Arcade Physics" system which is the simplest one. This system
        gives us all we need for our arcade game without being hard on performance so it is a good
        match for mobile devices with low specs.

        To learn more about the Arcade Physics refer to:
        http://docs.phaser.io/Phaser.Physics.Arcade.html

         */
        this.checkHitWithBlocks();
        this.checkHitWithPlayer();
        /*
        Now lets do some game management. We need to figure out if the player won or lost the game.
        If he did then we need to switch to the appropriate game state.
         */

        // Checking for game win scenario
        // Player wins the game once all blocks are gone.
        this.checkGameWin();
        // Checking for game over scenario
        // If player has no more lives then its over

        this.ballCollidesWithGround();


    },

    ballCollidesWithBlock: function(sprite, block) {
        console.log("Collided with block!");
        block.kill();
    },

    ballCollidesWithGround: function() {
        if (this.ball.y >= 470) {
            this.playerLives -= 1;
            this.resetBall();
        }

        /*
         Update lives display
         */

        this.livesDisplay.setText("Lives: " + this.playerLives);

        if (this.playerLives === 0) {
            this.state.start("GameOver");
        }

    }

};
