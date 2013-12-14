var game = game || {};   // Get the game object
(function (game) {
    // Initialise variables
    var bgReady = false,
        heroReady = false,
        monsterReady = false,
        bgImage = new Image(),
        heroImage = new Image(),
        monsterImage = new Image(),
        keyDown = {};
    bgImage.src = "images/background.png";
    heroImage.src = "images/hero.png";
    monsterImage.src = "images/monster.png";

    // Initialize global game obj vars
    game.env = {};
    game.players = {
        hero: {
            speed: 256, //movement in pixels per second
            x: 0,
            y: 0
        },
        monster: {
            x: 0,
            y: 0
        }
    };


    var envSetup = {            // setup the game environment
        stage: document.createElement("canvas"),
        init: function () {
            envSetup.stage.width = 512;
            envSetup.stage.height = 480;
            document.body.appendChild(envSetup.stage);
            document.body.style.overflow = "hidden"; // This is to switch off the default scroll functionality of browser
            envSetup.bindEvents();
        },
        bindEvents: function () {
            /*
            * Events for env & player load
            * */
            bgImage.onload = function () {
                bgReady = true;
            };
            heroImage.onload = function () {
                heroReady = true;
            };
            monsterImage.onload = function () {
                monsterReady = true;
            };
            /*
            * Events for player input
            * */
            addEventListener("keydown", function (e) {
                keyDown[e.keyCode] = true;
            }, false);

            addEventListener("keyup", function (e) {
                delete keyDown[e.keyCode];
            }, false);
        },
        render : function(){
        if (bgReady) {
            game.context.drawImage(bgImage, 0, 0);
        }

        if (heroReady) {
            game.context.drawImage(heroImage, game.players.hero.x, game.players.hero.y);
        }

        if (monsterReady) {
            game.context.drawImage(monsterImage, game.players.monster.x, game.players.monster.y);
        }
    }
    };

    game.context = envSetup.stage.getContext("2d");
    game.env.init = envSetup.init();
    game.env.stage = envSetup.stage;
    game.env.keyDown = keyDown;
    game.render = function(){
        if (bgReady) {
            game.context.drawImage(bgImage, 0, 0);
        }

        if (heroReady) {
            game.context.drawImage(heroImage, game.players.hero.x, game.players.hero.y);
        }

        if (monsterReady) {
            game.context.drawImage(monsterImage, game.players.monster.x, game.players.monster.y);
        }
    }

})(game);