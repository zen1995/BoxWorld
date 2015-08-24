var Bullet = cc.DrawNode.extend({
	physics:{
		speed:null,
	},
	ctor:function(position,speed){
		this._super();
		this.drawDot(cc.p(0,0),5,cc.color(255,0,0,255));//pos, radius, color
		
		this.physics = [];
		this.physics.speed = cc.p(speed.x*4,speed.y*4);
		this.setPosition(position);
		this.scheduleOnce(this.removeThis,3)
	},
	
	updatePosition:function(){
		this.x = this.x + this.physics.speed.x;
		this.y = this.y + this.physics.speed.y;
	},
	
	removeThis:function(){
		globalVars.space.removeBullet(this);
	}
})
