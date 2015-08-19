var MyBox = basePhysicsObject.extend({
	physics:{
		destination:null,
		speed:null
	},
	ctor:function(){
		this._super(res.png_box);
		this.setPosition(cc.p(100,300));
		this.init();
	},
	
	init:function(){
		this.physics.speed = cc.p(0,0);
	}
});
