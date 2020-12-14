class Health{
	constructor(hp){
		this.hp = hp;
		this.img = loadImage("Img/heart.png")
	}

	damage(){
		this.hp--;
	}

	display(){
		for(var i = 0;i<this.hp;i++){
			//creates hearts
			image(this.img,30*i + Mario.x - 75,Mario.y-60,30,30);
		}
	}

	dead(){
		if(this.hp < 0){
			return true;
		}else if(this.hp > 0){
			return false;
		}
	}
}