var Mario;
var Ground;
var gameState = 1;
var obs = [];

function preload(){
	marioImg = loadImage("Img/Mario.png");
}

function setup() {
	createCanvas(windowWidth,windowHeight);
	//
	Mario = createSprite(100,windowHeight-200,50,50);
	Mario.addImage(marioImg);
	//
	Ground = createSprite(2000/2,windowHeight-15,2000,40);
	Ground.shapeColor = "brown";
	obs.push(Ground);
	//
	wall1 = createSprite(-20,windowHeight/2,20,windowHeight);
	wall1.shapeColor = "grey";
	obs.push(wall1);
	//
	obs1 = createSprite(200,windowHeight-60,50,50);
	obs1.shapeColor = "grey";
	obs.push(obs1);
	//
	obs2 = createSprite(250,windowHeight-110,50,50);
	obs2.shapeColor = "grey";
	obs.push(obs2);
	//
	obs3 = createSprite(300,windowHeight-110,50,50);
	obs3.shapeColor = "grey";
	obs.push(obs3);
	//
	obs4 = createSprite(350,windowHeight-60,50,50);
	obs4.shapeColor = "grey";
	obs.push(obs4);
	//
	river1 = createSprite(275,windowHeight-35,100,100);
	river1.shapeColor = "blue";
	//
	obs5 = createSprite(600,windowHeight-60,50,50);
	obs5.shapeColor = "grey";
	obs.push(obs1);
	//
	obs2 = createSprite(650,windowHeight-110,50,50);
	obs2.shapeColor = "grey";
	obs.push(obs2);
	//
	obs3 = createSprite(700,windowHeight-110,50,50);
	obs3.shapeColor = "grey";
	obs.push(obs3);
	//
	obs4 = createSprite(750,windowHeight-60,50,50);
	obs4.shapeColor = "grey";
	obs.push(obs4);
	//
	river = createSprite(675,windowHeight-35,100,100);
	river.shapeColor = "blue";
}

function draw() {
	background(0,255,255);
	Move();
	
	for(var i = 0;i<obs.length;i++){
		Mario.collide(obs[i]);
	}

	drawSprites();

	if(gameState == 1){

	}
}

function Move(){
	if(keyDown(RIGHT_ARROW)){
		Mario.x += 4;
	}else if(keyDown(LEFT_ARROW)){
		Mario.x -= 4;
	}
	if(Mario.y>700){
		if(keyDown(32)){
			Mario.velocityY = -10;
		}
	}
	Mario.velocityY += 0.8;

	camera.x = Mario.x;
}