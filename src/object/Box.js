var Box = basePhysicsObject.extend({
	physics:{
		destination:null,
		speed:null,
		mass:null,
		status:null,
		type:null
	},
	ctor:function(){
		this._super(res.png_box2);
		this.setPosition(cc.p(200,300));
		this.init();
	},
	
	init:function(){
		this.physics.speed = cc.p(0,0);
		this.physics.mass = 10;
		this.physics.status = gameConstant.objectStatus.onAir;
		this.physics.type = gameConstant.objectType.enemy;
	},
	
});