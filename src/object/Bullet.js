var Bullet = cc.DrawNode.extend({
	physics:{
		speed:null,
	},
	target:null,
	ctor:function(position,speed,target){
		this._super();
		this.drawDot(cc.p(0,0),5,cc.color(255,0,0,255));
		
		this.physics = [];
		this.target = [];
		this.physics.speed = cc.p(speed.x*10,speed.y*10);
		this.target = target;
		this.setPosition(position);
		this.scheduleOnce(this.removeThis,3);
	},
	
	updatePosition:function(){
		this.x = this.x + this.physics.speed.x;
		this.y = this.y + this.physics.speed.y;
	},
	
	removeThis:function(){
		globalVars.space.removeBullet(this);
	}
})
