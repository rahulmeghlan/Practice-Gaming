/*
http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/
*/



var CatchEM = {};

(function(ns){

	//Define Game State
	ns.state = {
		player:{
			speed: 250,	//pixels per seconds
			x: 0,
			y: 0,
			width: 0,
			height: 0,
			image: 0
		},
		enemy: {
			x: 0,
			y: 0,
			width: 0,
			height: 0,
			image: 0
		},
		background: {
			x: 0,
			y: 0,
			image: 0
		},
		events: {
			keyButton: {
				pressed: false
			},
			graphics: {}
		},
		score: {
			text: 'Monsters Caught: '
			count: 0,
			x: 50,
			y: 50
		}
		config: {
			fps: 60,
			gameId: 0,
			width: 400,
			height: 400,
			ctx: 0,
			elm: 0
		}
	};
	
	//Define game event-handlers
	ns.evtH = {
		hKeyDown: function(e){
			ns.state.events.keyButton.pressed = true;
			ns.state.events.keyButton[e.keyCode] = true;
		},
		hKeyUp: function(e){
			ns.state.events.keyButton.pressed = false;
			delete ns.state.events.keyButton[e.keyCode];
		},
		hPlayerLoad: function(e){
			ns.state.events.graphics['player'] = true;
		},
		hEnemyLoad: function(e){
			ns.state.events.graphics['enemy'] = true;
		},
		hbackgroundLoad: function(e){
			ns.state.events.graphics['background'] = true;
		}
	};
	
	//Define game Function
	ns.fns = {
		update: function(modifier){
			//Local Copy
			var keyButton = ns.state.events.keyButton,
				player = ns.state.player,
				enemy = ns.state.enemy,
				score = ns.state.score;
				
			// Simply return if no button is pressed
			if (!keyButton.pressed) return false;
			
			//move Left when Left arrow pressed
			if (37 in keyButton) player.x -= (player.speed * modifier);
			//move Top when Top arrow pressed
			else if (38 in keyButton) player.y -= (player.speed * modifier);
			//move Right when upRightarrow pressed
			else if (39 in keyButton) player.x += (player.speed * modifier);
			//move Bottom when Bottom arrow pressed
			else if (34 in keyButton) player.y += (player.speed * modifier);
			// Return is some other Key is pressed
			else return false;
			
			//Collision Detection
			if (player.x <= (enemy.x + enemy.width) && enemy.x <= (player.x + player.width) 
				 && player.y <= (enemy.y + enemy.height) && enemy.y <= (player.y + player.height)){
				++score.count;
				//Restart Game
				this.reset();
			}
		},
		render: function(){
			//Local copy
			var player = ns.state.player,
				enemy = ns.state.enemy,
				background = ns.state.background,
				score = ns.state.score,
				ctx = ns.state.config.ctx,
				graphics = ns.state.events.graphics;
				
			//Render Background
			if ('background' in graphics) ctx.drawImage(background.image , background.x, background.y);
			
			//Render Score
			ctx.draw
			
			//Render Player
			if ('player' in graphics) ctx.drawImage(player.image, player.x, player.y);
			
			//Render Enemy
			if ('enemy' in graphics) ctx.drawImage(enemy.image, enemy.x, enemy.y);
		},
		reset: function(){
			//Reset Player at center
			ns.state.player.x = ns.state.config.width / 2;
			ns.state.player.y = ns.state.config.height / 2;
			
			//Drop Enemy randomly on screen
			ns.state.enemy.x = Math.random() * ns.state.config.width;
			ns.state.enemy.y = Math.random() * ns.state.config.height;
		},
		main: function(){
			update(1 / ns.state.config.fps);
			render():
		},
		createStage: function(){
			var canvas = document.createElement('canvas');
			
			canvas.width = ns.state.config.width;
			canvas.height = ns.state.config.height;
			
			//Save references
			ns.state.config.elm = canvas;
			ns.state.config.ctx = canvas.getContext('2d');
			
			document.body.appendChild(canvas);
		},	
		removeStage: function(){
			document.removeChild(ns.state.config.elm);
			ns.state.config.ctx = 0;
		},
		registerEvents: function(){
			addEventListener('keydown', ns.evtH.hKeyDown);
			addEventListener('keyUp', ns.evtH.hKeyUp);
		},	
		unRegisterEvents: function(){
			removeEventListener('keydown', ns.evtH.hKeyDown);
			removeEventListener('keyUp', ns.evtH.hKeyUp);
		},
		init: function(){
			this.createStage();
			this.registerEvents();
			ns.state.config.gameId = setInterval(this.main, 1000 / ns.state.config.fps);
		},
		destroy: function(){
			this.removeStae();
			this.unRegisterEvents();
			clearInterval(ns.state.config.gameId);
		}
	};
	
	//Start Game
	ns.fns.init();
	

})(catchEM, undefined);