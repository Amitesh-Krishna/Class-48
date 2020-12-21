var Mario;
var Ground;
var gameState = 1;
var obs = [];
var enemies = [];
var fruits = [];
var fruits2 = [];
var HpBar;
var score = 0;
var bgColor;

function preload(){
	marioR= loadAnimation("Img/Mario.png");
	marioL = loadAnimation("Img/Mario1.png");
	enemyImg1 = loadImage("Img/enemy1.png");
	enemyImg2 = loadImage("Img/enemy2.png");
	marioWalkL = loadAnimation("Img/MarioWalkL1.png","Img/MarioWalkL2.png","Img/MarioWalkL3.png");
	marioWalkR = loadAnimation("Img/MarioWalkR1.png","Img/MarioWalkR2.png","Img/MarioWalkR3.png");
	fruitImg = loadImage("Img/Fruit.png");
	townImg = loadImage("Img/town.png");
}

function setup() {
	createCanvas(windowWidth,windowHeight);

	bgColor = rgb(0,255,255);
	//The level 1
	//The town
	town = createSprite(2600,windowHeight-215,200,200);
	town.addImage(townImg);
	town.scale = 2;
	// Mario
	Mario = createSprite(100,windowHeight-200,50,50);
	Mario.addAnimation("right",marioR);
	Mario.addAnimation("left",marioL);
	Mario.addAnimation("R",marioWalkR);
	Mario.addAnimation("L",marioWalkL);

	HpBar = new Health(5);
	//
	Ground = createSprite(1472,windowHeight-15,3000,40);
	Ground.shapeColor = "brown";
	obs.push(Ground);

	wall1 = createSprite(-20,windowHeight/2,20,windowHeight);
	wall1.shapeColor = "grey";
	obs.push(wall1);

	wall2 = createSprite(2980,windowHeight/2,20,windowHeight);
	wall2.shapeColor = "grey";
	obs.push(wall2);

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
	enemy1 = new Enemy(475,windowHeight-60);
	enemies.push(enemy1);

	enemy2 = new Enemy(875,windowHeight-60);
	enemies.push(enemy2);

	enemy3 = new Enemy(1275,windowHeight-60);
	enemies.push(enemy3);

	enemy4 = new Enemy(1675,windowHeight-60);
	enemies.push(enemy4);
	// Fruits
	for(var i = 15;i<3000;i+=200){
		var fruitI = createSprite(i,750,20,20);
		fruitI.addImage(fruitImg);
		fruits.push(fruitI);
	}

	//the level 2

	Ground2 = createSprite(1472,windowHeight-15,3000,40);
	Ground2.shapeColor = "brown";

	wall3 = createSprite(-20,windowHeight/2,20,windowHeight);
	wall3.shapeColor = "grey";

	wall4 = createSprite(2980,windowHeight/2,20,windowHeight);
	wall4.shapeColor = "grey";
	
	enemy5 = new Enemy(475,windowHeight-60);
	enemy5.sprite.visible = false;
	
	enemy6 = new Enemy(875,windowHeight-60);
	enemy6.sprite.visible = false;

	enemy7 = new Enemy(1275,windowHeight-60);
	enemy7.sprite.visible = false;

	enemy8 = new Enemy(1675,windowHeight-60);
	enemy8.sprite.visible = false;

	enemy9 = new Enemy(2075,windowHeight-60);
	enemy9.sprite.visible = false;
	
	enemy10 = new Enemy(2475,windowHeight-60);
	enemy10.sprite.visible = false;

	for(var j = 15;j<3000;j+=200){
		var fruitI = createSprite(i,750,20,20);
		fruitI.addImage(fruitImg);
		fruits2.push(fruitI);
	}

	TheSewerPipe = createSprite(2875,windowHeight-90,200,100);
	TheSewerPipe.shapeColor = "lime";
	TheSewerPipe.visible = false;

	//Level 3

	Ground3 = createSprite(1472,windowHeight-15,3000,40);
	Ground3.shapeColor = "brown";

	wall5 = createSprite(-20,windowHeight/2,20,windowHeight);
	wall5.shapeColor = "grey";

	wall6 = createSprite(2980,windowHeight/2,20,windowHeight);
	wall6.shapeColor = "grey";

	DaBoss = createSprite(1500,windowHeight-200,400,400);
	DaBoss.visible = false;
	DaBoss.addImage(loadImage("Img/Boss.png"))
}

function draw() {
	background(bgColor);
	Move();
	textSize(30);
	
	for(var i = 0;i<obs.length;i++){
		Mario.collide(obs[i]);
	}

	for(var j = 0;j<enemies.length;j++){
		if(Mario.isTouching(enemies[j].sprite)){
			if(Mario.y<(enemies[j].y-10)){
				enemies[j].kill();
			}else{
				HpBar.damage();
				Mario.x = 100;
			}
		}
	} 

	for(var k = 0;k<enemies.length;k++){
		enemies[k].move();
	}

	for(var l = 0;l<fruits.length;l++){
		if(Mario.isTouching(fruits[l])){
			fruits[l].destroy();
			score++;
		}
	}

	drawSprites();
	HpBar.display();
	Score();

	if(gameState == 1){
		text("Use left and right arrows to move.",0,500);
		text("Use Space to Jump.",0,550);

		text("Ooh! Mushrooms!",600,500);
		text("Go Jump on Them!",600,550);

		text("The cherries can be collected.",1100,500);
		text("Collect them for a 3-star score!",1100,550);

		if(Mario.x>=2910){
			gameState = 2;
			Lvl2();
		}
	}

	if(gameState == 2){
		if(Mario.isTouching(TheSewerPipe)){
			lvl3();
		}
	}

	if(gameState == 3){
		if(Mario.isTouching(DaBoss)){
			gameState = 4;
		}
	}

	if(gameState == 4){
		GameEnd();
	}
}

function Move(){

	if(keyDown(RIGHT_ARROW)){
		Mario.x += 4;
		Mario.changeAnimation("R");
	}else if(keyDown(LEFT_ARROW)){
		Mario.x -= 4;
		Mario.changeAnimation("L");
	}

	if(keyWentUp(RIGHT_ARROW)){
		Mario.changeImage("right");
	}else if(keyWentUp(LEFT_ARROW)){
		Mario.changeImage("left");
	}
	
	if(keyWentDown(32) && Mario.y>675){
		Mario.velocityY = -10;
	}

	Mario.velocityY += 0.8;

	camera.x = Mario.x;
}

function Score(){
	image(fruitImg,Mario.x-50,Mario.y - 120);
	text("x"+score,Mario.x,Mario.y - 80);
}

function Lvl2(){
	bgColor = rgb(0,155,255);
	Mario.x = 100;
	
	for(var i = 0;i<obs.length;i++){
		obs[i].destroy();
	}

	for(var j = 0;j<fruits.length;j++){
		fruits[j].destroy();
	}

	for(var k = 0;k<enemies.length;k++){
		enemies[k].sprite.destroy();
	}

	town.x = 275;

	obs = [];
	fruits = fruits2;
	enemies = [];

	obs.push(Ground2);
	obs.push(wall3);
	obs.push(wall4);

	enemy5.sprite.visible = true;
	enemy6.sprite.visible = true;
	enemy7.sprite.visible = true;
	enemy8.sprite.visible = true;
	enemy9.sprite.visible = true;
	enemy10.sprite.visible = true;

	enemies.push(enemy5);
	enemies.push(enemy6);
	enemies.push(enemy7);
	enemies.push(enemy8);
	enemies.push(enemy9);
	enemies.push(enemy10);

	TheSewerPipe.visible = true;
}

function lvl3(){
	gameState = 3;
	bgColor = rgb(0,128,0);

	for(var i = 0;i<obs.length;i++){
		obs[i].destroy();
	}

	for(var j = 0;j<fruits.length;j++){
		fruits[j].destroy();
	}

	for(var k = 0;k<enemies.length;k++){
		enemies[k].sprite.destroy();
	}

	TheSewerPipe.destroy();

	town.destroy();

	obs = [];
	fruits = [];
	enemies = [];

	obs.push(Ground3);
	obs.push(wall5);
	obs.push(wall6);

	DaBoss.visible = true;
}

function GameEnd(){
	bgColor = "white";

	for(var i = 0;i<obs.length;i++){
		obs[i].destroy();
	}

	for(var j = 0;j<fruits.length;j++){
		fruits[j].destroy();
	}

	for(var k = 0;k<enemies.length;k++){
		enemies[k].sprite.destroy();
	}

	DaBoss.destroy();

	camera.x = Mario.x;
	Mario.velocityY = 0;
	Mario.y += 10;
	camera.y += 10;
}