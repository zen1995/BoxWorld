var MyBox = basePhysicsObject.extend({
	physics:{
		destination:null,
		speed:null,
		mass:null,
		status:null
	},
	attackCounter:{
		current:0,
		max:1,
	},
	ctor:function(){
		this._super(res.png_box);
		this.setPosition(cc.p(100,300));
		this.init();
		
		this.schedule(function(){this.attackCounter.current = 0;},0.5,cc.REPEAT_FOREVER,0)
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
	},
	
	attack:function(direction){
		if(this.attackCounter.current >=this.attackCounter.max){
			return;
		}
		
		this.attackCounter.current++;
		this.createBullet(direction);
	},
	
	createBullet:function(direction){
		var bullet = new Bullet(this.getPosition(),direction);
		var parent = this.getParent();
		parent.addChild(bullet);
		globalVars.space.addBullet(bullet)
	}
});
