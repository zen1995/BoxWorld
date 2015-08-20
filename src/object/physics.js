var Space = cc.Node.extend({
	objects:null,
	config:{
		gravity:null,
		maxSpeed:20
	},
	blocks:null,
	tileMap:null,
	ctor:function(config,tileMap){
		this._super();
		this.init(config,tileMap);
		this.mySchedule(this.update,0.03);
	},
	
	init:function(config,tileMap){
		this.config.gravity = cc.p(0,-0.3)//config;
		this.objects = new Array();
		this.blocks = new Array();
		this.tileMap = tileMap;
	},
	
	mySchedule:function(callback,interval){
		var then = Date.now();
		interval = interval*1000;
		this.schedule(function(){
			var now = Date.now();
			var delta = now - then;
			if(delta >interval){
				then = now - (delta %interval);
				callback.call(this);
			}
		}.bind(this),0);
	},
	
	update:function(){
		//cc.log("step")
		this.step();
	},
	
	addObject:function(obj){
		this.objects.push(obj);
	},
	
	step:function(){
		this.updateDestination();
		this.CollisionWithBlock();
	},
	
	updateDestination:function(){
		for(var i=0;i<this.objects.length;i++){
			var v = this.objects[i].getSpeed();
			v=cc.p(v.x+this.config.gravity.x,v.y+this.config.gravity.y);
			this.objects[i].setSpeed(v);
			var pos = this.objects[i].getPosition();
			this.objects[i].physics.destination = cc.p(pos.x+v.x,pos.y+v.y);
		}
	},
	
	CollisionWithBlock:function(){	
		for(var i=0;i<this.objects.length;i++){
			var object = this.objects[i];
			var pos = object.physics.destination;
			var tiles = this.tileMap.getSurroundTile(pos,"through");
			var collision = false;
			for(var ii=0; ii<tiles.length; ii++){
				var objBox = object.getDestinationBoundingBox();
				if(tiles[ii].status == false){
					continue;
				}
				var result = cc.rectIntersectsRect(objBox,tiles[ii].rect);
				var speed = [false,false];
				if(result == true){
					var rect = cc.rectIntersection(objBox,tiles[ii].rect);
					if(ii<4){
						switch (ii){
							case 0 :
								pos = (cc.p(pos.x,pos.y-rect.height));
								speed[1] = true;
								break;
							case 1 :
								pos = (cc.p(pos.x+rect.width,pos.y));
								speed[0] = true;
								break;
							case 2 :
								pos = (cc.p(pos.x-rect.width,pos.y));
								speed[0] = true;
								break;
							case 3 :
								pos = (cc.p(pos.x,pos.y+rect.height));
								speed[1] = true;
								break;						
						}
						collision = true;
					}
					else{
						if(collision == true){
							break;
						}
						else{
							switch (ii){
								case 4 :
									if (rect.width>=rect.height){
										pos = (cc.p(pos.x,pos.y-rect.height));
										speed[1] = true;
									}
									else{
										pos = (cc.p(pos.x+rect.width,pos.y));
										speed[0] = true;
									}
									break;
								case 5:
									if (rect.width>=rect.height){
										pos = (cc.p(pos.x,pos.y-rect.height));
										speed[1] = true;
									}
									else{
										pos = (cc.p(pos.x-rect.width,pos.y));
										speed[0] = true;
									}
									break;
								case 6 :
									if (rect.width>=rect.height){
										pos = (cc.p(pos.x,pos.y+rect.height));
										speed[1] = true;
									}
									else{
										pos = (cc.p(pos.x+rect.width,pos.y));
										speed[0] = true;
									}
									break;
								case 7 :
									if (rect.width>=rect.height){
										pos = (cc.p(pos.x,pos.y+rect.height));
										speed[1] = true;
									}
									else{
										pos = (cc.p(pos.x-rect.width,pos.y));
										speed[0] = true;
									}
									break;							
							}							
						}
					}
				}
				if(speed[0] == true){
					object.setSpeed(cc.p(0,object.getSpeed().y));
				}
				if(speed[1] == true){
					object.setSpeed(cc.p(object.getSpeed().x,0));
				}
				object.physics.destination = pos;
			}
			object.setPosition(pos);
		}
	},
	
	collisionWithBox:function(){
		for(var i=0;i<this.objects,length;i++){
			for(var ii=i+1;ii<this.objects.length;ii++){
				var obj1 = this.objects[i];
				var obj2 = this.objects[ii];
				var box1 = this.objects[i].getDestinationBoundingBox();
				var box2 = this.objects[ii].getDestinationBoundingBox();
				var result = c.rectIntersectsRect(box1,box2);
				if(result == true){
					var rect = cc.rectIntersection(box1,box2);
					var e = 1;
					var m1 = box1.physics.mass,m2 = box2.physics.mass;
					if(rect.width>=rect.height){
						var v10 = box1.getSpeed().y;
						var v20 = box2.getSpeed().y;
					}else{
						var v10 = box1.getSpeed().x;
						var v20 = box2.getSpeed().x;						
					}
					var v11 = ((v10-v20)/e*m2 - (m1*v10+m2*v20) )/(-m1-m2);
					var v21 = (-1*(m1*v10+m2*v20)-(v10-v20)/e*m1 )/(-m1-m2);
					if(rect.width>=rect.height){
						obj1.setSpeed(cc.p(obj1.getSpeed().x,v11));
						obj2.setSpeed(cc.p(obj2.getSpeed().x,v21));						
					}
					else{
						obj1.setSpeed(cc.p(v11,obj1.getSpeed().y));
						obj2.setSpeed(cc.p(v21,obj2.getSpeed().y));							
					}
				}
			}
		}
	}
	
})
