var Layer_attackStick = cc.Layer.extend({
	stick:{
		background:null,
		stick:null,
		info:{
			l0:20,
			l1:40,
			l2:60,
		},
		//command:null,
		direction:null,
	},
	touchStatus:null,
	listener:{
		mouse:null
	},
	ctor:function(){
		this._super();
		this.init();
		this.initStick();
		
		
		if("mouse" in cc.sys.capabilities){
			cc.eventManager.addListener({
					event: cc.EventListener.MOUSE,
					onMouseDown:this.mouseDown.bind(this),
					onMouseMove:this.mouseMove.bind(this),
					onMouseUp:this.mouseUp.bind(this),
				},this);
		}
		
		if("touches"  in cc.sys.capabilities){
			cc.eventManager.addListener({
				event:cc.EventListener.TOUCH_ALL_AT_ONCE,
				onTouchesBegan:this.touchDown.bind(this),
				onTouchesMoved:this.touchMove.bind(this),
				onTouchesEnded:this.touchUp.bind(this)
			},this);
		}
		
		//this.mouseUp();
			
		this.scheduleUpdate();		
		return true;
		
	},
//	onExit:function(){
//		//cc.eventManager.removeListener(this.listener.mouse);
//	},
	
	init:function(){
		this.touchStatus = false;
	},
	
	initStick:function(){
		var stickposition = cc.p(gameConstant.winSize.width-100,100);
		var posZero = cc.p(0,0);
		this.stick.background = new cc.DrawNode();
		this.stick.background.setPosition(stickposition);
		this.stick.background.drawDot(posZero, this.stick.info.l2, cc.color(100,100,100,150));
		this.stick.background.drawDot(posZero, this.stick.info.l1, cc.color(175,175,175,150));
		this.stick.background.drawDot(posZero, this.stick.info.l0, cc.color(225,225,225,150));
		this.addChild(this.stick.background,0);
		
		this.stick.stick = new cc.DrawNode();
		this.stick.stick.drawDot(posZero,20,cc.color(0,191,255,255));
		this.stick.stick.setPosition(stickposition);
		this.addChild(this.stick.stick);
	},
	
	
	
	update:function(){
		if(this.touchStatus == false){
			return;
		}
		globalVars.myBox.attack(this.stick.direction);
	},
	
	touchDown:function(touches,event){
		for(var i=0;i<touches.length;i++){
			this.mouseDown(touches[i]);
		}
	},
	
	touchMove:function(touches,event){
		for(var i=0;i<touches.length;i++){
			this.mouseMove(touches[i]);
		}
	},
	
	touchUp:function(touches,event){
		for(var i=0;i<touches.length;i++){
			this.mouseUp(touches[i]);
		}		
	},
	
	mouseDown:function(event){
		var location = event.getLocation();
		if(location.x<gameConstant.winSize.width/2){
			return;
		}
		this.touchStatus = true;
		this.stick.background.setVisible(true);
		//this.stick.background.setPosition(location);
		this.stick.stick.setVisible(true);
		//this.stick.stick.setPosition(location);
		
		this.setDirection(cc.p(location.x-this.stick.background.x,location.y-this.stick.background.y));
	},
	
	mouseMove:function(event){
		var location = event.getLocation();
		if(this.touchStatus == false || location.x<gameConstant.winSize.width/2){
			return false;
		}
		var distance = Math.sqrt((location.x-this.stick.background.x)*(location.x-this.stick.background.x)
				+(location.y-this.stick.background.y)*(location.y-this.stick.background.y));
		if(distance<=this.stick.info.l2){
			this.stick.stick.setPosition(location);
		}
		else {
			var rate = this.stick.info.l2/distance;
			this.stick.stick.setPosition(cc.p(this.stick.background.x+(location.x-this.stick.background.x)*rate,
				this.stick.background.y+(location.y-this.stick.background.y)*rate));
		}
		this.setDirection(cc.p(location.x-this.stick.background.x,location.y-this.stick.background.y));
		
	},
	
	mouseUp:function(event){
		var location = event.getLocation();
		if(location.x<gameConstant.winSize.width/2){
			return;
		}
		
		this.touchStatus = false;
//		this.stick.background.setVisible(false);
//		this.stick.stick.setVisible(false);
		this.stick.stick.setPosition(this.stick.background.getPosition());
	},
	
	setDirection:function(v){
		var l = Math.sqrt((v.x*v.x)+v.y*v.y);
		v = cc.p(v.x/l,v.y/l);
		this.stick.direction = v;
	}
	
		
});

