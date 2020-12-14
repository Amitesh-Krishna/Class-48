class Enemy{
	constructor(x,y){
		this.sprite = createSprite(x,y,30,30);
		this.sprite.addImage("right",enemyImg1);
		this.sprite.addImage("left",enemyImg2);
		this.sprite.scale = 0.15;
		this.x = x;
		this.y = y;
		this.look = "right";
	}

	kill(){
		this.sprite.destroy();
	}

	move(){
		if(this.sprite.x > this.x - 100 && this.sprite.x < this.x + 100){
			if(this.sprite.x == this.x + 90){
				this.look = "left";
			}
			if(this.sprite.x == this.x - 90){
				this.look = "right";
			}
		}
		if(this.look == "right"){
			this.sprite.changeImage("right");
			this.sprite.x += 5;
		}
		if(this.look == "left"){
			this.sprite.changeImage("left");
			this.sprite.x -= 5;
		}
	}
}