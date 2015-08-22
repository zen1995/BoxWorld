var MyBox = basePhysicsObject.extend({
	physics:{
		destination:null,
		speed:null,
		mass:null,
		status:null
	},
	ctor:function(){
		this._super(res.png_box);
		this.setPosition(cc.p(100,300));
		this.init();
	},
	
	init:function(){
		this.physics.speed = cc.p(3,0);
		this.physics.mass = 10;
		this.status = gameConstant.objectStatus.onAir;
	},
	
	move:function(direction){
		switch (direction){
			case "up":
				this.physics.speed.y+=1
				break;
			case "right":
				this.physics.speed.x+=1
				break;
			case "down" :
				this.physics.speed.y-=1
				break;
			case "left" :
				this.physics.speed.x-=1
				break;
		}
	}
});
