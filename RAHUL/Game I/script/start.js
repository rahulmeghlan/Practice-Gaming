var game = game || {};   // Get the game object
(function (game) {
    var fns = {
        init: function () {
            game.reset();
            this.loop();
        },
        loop: function () {
            game.then = Date.now();
            setInterval(game.gameLoop, 1); //Execute as fast as possible
        }

    };

    // start the game
    fns.init();
})(game);