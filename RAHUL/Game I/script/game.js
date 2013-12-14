/*
 * This file is for handling the game logic
 * */

var game = game || {};

(function () {
    var monsterCaught = 0,
        reset = function () {
            game.players.hero.x = game.env.stage.width / 2;
            game.players.hero.y = game.env.stage.height / 2;

            //throw the monster somewhere on the screen randomly
            game.players.monster.x = 32 + (Math.random() * (game.env.stage.width - 64));
            game.players.monster.y = 32 + (Math.random() * (game.env.stage.height - 64));
        },
        update = function (modifier) {
            if (38 in game.env.keyDown) { // Player holding up
                game.players.hero.y -= game.players.hero.speed * modifier;
            }
            if (40 in game.env.keyDown) { // Player holding down
                game.players.hero.y += game.players.hero.speed * modifier;
            }
            if (37 in game.env.keyDown) { // Player holding left
                game.players.hero.x -= game.players.hero.speed * modifier;
            }
            if (39 in game.env.keyDown) { // Player holding right
                game.players.hero.x += game.players.hero.speed * modifier;
            }

            //Collision detection
            if (game.players.hero.x <= (game.players.monster.x + 32) && game.players.monster.x <= (game.players.hero.x + 32) && game.players.hero.y <= (game.players.monster.y + 32) && game.players.monster.y <= (game.players.hero.y + 32)) {
                ++monsterCaught;
                reset();
            }
        },
        gameLoop = function(then){
            var now = Date.now(),
                delta = now - then;

            update(delta / 1000);
            game.render();
            then = now;
        },

})();