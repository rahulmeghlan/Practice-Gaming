(function () {
    var canvas = document.createElement("canvas"),
        ctx = canvas.getContext("2d");
    canvas.width = 512;
    canvas.height = 480;
    document.body.appendChild(canvas);
    document.body.style.overflow = "hidden";


//Include images
    var bgReady = false,
        heroReady = false,
        monsterReady = false,
        bgImage = new Image(),
        heroImage = new Image(),
        monsterImage = new Image();
    bgImage.onload = function () {
        bgReady = true;
    };
    heroImage.onload = function () {
        heroReady = true;
    };
    monsterImage.onload = function () {
        monsterReady = true;
    };

    bgImage.src = "images/background.png";
    heroImage.src = "images/hero.png";
    monsterImage.src = "images/monster.png";

//Game Objects

    var hero = {
            speed: 256, //movement in pixels per second
            x: 0,
            y: 0
        },
        monster = {
            x: 0,
            y: 0
        },
        monsterCaught = 0;

//Player Input

    var keyDown = {};

    addEventListener("keydown", function (e) {
        keyDown[e.keyCode] = true;
    }, false);

    addEventListener("keyup", function (e) {
        delete keyDown[e.keyCode];
    }, false);

//New Game

//reset the game when the player catches a monster
    var reset = function () {
        hero.x = canvas.width / 2;
        hero.y = canvas.height / 2;

        //throw the monster somewhere on the screen randomly
        monster.x = 32 + (Math.random() * (canvas.width - 64));
        monster.y = 32 + (Math.random() * (canvas.height - 64));
    }

//Update game Objects

    var update = function (modifier) {
        if (38 in keyDown) { // Player holding up
            hero.y -= hero.speed * modifier;
        }
        if (40 in keyDown) { // Player holding down
            hero.y += hero.speed * modifier;
        }
        if (37 in keyDown) { // Player holding left
            hero.x -= hero.speed * modifier;
        }
        if (39 in keyDown) { // Player holding right
            hero.x += hero.speed * modifier;
        }

        //Collision detection
        if (hero.x <= (monster.x + 32) && monster.x <= (hero.x + 32) && hero.y <= (monster.y + 32) && monster.y <= (hero.y + 32)) {
            ++monsterCaught;
            reset();
        }
    };

//Render Objects

//draw everything

    var render = function () {
        if (bgReady) {
            ctx.drawImage(bgImage, 0, 0);
        }

        if (heroReady) {
            ctx.drawImage(heroImage, hero.x, hero.y);
        }

        if (monsterReady) {
            ctx.drawImage(monsterImage, monster.x, monster.y);
        }
    }

//Score

    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Goblins caught: " + monsterCaught, 32, 32);

// The main game loop
    var main = function () {
        var now = Date.now(),
            delta = now - then;

        update(delta / 1000);
        render();
        then = now;
    }

//Start the game
    reset();
    var then = Date.now();
    setInterval(main, 1); //Execute as fast as possible
})();