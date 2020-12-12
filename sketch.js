var Mario;
var Ground;
var gameState = 1;
var obs = [];
var enemies = [];
var fruits = [];
var HpBar;
var MarioLook;

function preload(){
	marioImg = loadImage("Img/Mario.png");
	marioImg1 = loadImage("Img/Mario1.png");
	enemyImg1 = loadImage("Img/enemy1.png");
	enemyImg2 = loadImage("Img/enemy2.png");
}

function setup() {
	createCanvas(windowWidth,windowHeight);
	//
	Mario = createSprite(100,windowHeight-200,50,50);
	Mario.addImage("right",marioImg);
	Mario.addImage("left",marioImg1);
	//
	Ground = createSprite(2000/2,windowHeight-15,2000,40);
	Ground.shapeColor = "brown";
	obs.push(Ground);
	//
	wall1 = createSprite(-20,windowHeight/2,20,windowHeight);
	wall1.shapeColor = "grey";
	obs.push(wall1);
	// The bridge
	obs1 = createSprite(200,windowHeight-60,50,50);
	obs1.shapeColor = "grey";
	obs.push(obs1);

	obs2 = createSprite(250,windowHeight-110,50,50);
	obs2.shapeColor = "grey";
	obs.push(obs2);

	obs3 = createSprite(300,windowHeight-110,50,50);
	obs3.shapeColor = "grey";
	obs.push(obs3);

	obs4 = createSprite(350,windowHeight-60,50,50);
	obs4.shapeColor = "grey";
	obs.push(obs4);
	// Enemies
	enemy1 = new Enemy(400,windowHeight-60);
	enemies.push(enemy1);

	enemy2 = new Enemy(425,windowHeight-60);
	enemies.push(enemy2);
}

function draw() {
	background(0,255,255);
	Move();
	textSize(30);
	
	for(var i = 0;i<obs.length;i++){
		Mario.collide(obs[i]);
	}

	for(var j = 0;j<enemies.length;j++){
		if(Mario.isTouching(enemies[j])){
			enemies[j].kill();
		}
	} 

	drawSprites();

	if(gameState == 1){
		text("Use left and right arrows to move.",0,500);
		text("Use Space to Jump.",0,550);
	}
}

function Move(){
	if(keyDown(RIGHT_ARROW)){
		Mario.changeImage("right");
		Mario.x += 4;
	}else if(keyDown(LEFT_ARROW)){
		Mario.changeImage("left");;
		Mario.x -= 4;
	}
	if(Mario.y>700){
		if(keyWentDown(32)){
			Mario.velocityY = -10;
		}
	}
	Mario.velocityY += 0.8;

	camera.x = Mario.x;
}