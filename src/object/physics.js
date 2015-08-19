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
		for(var i=0;i<this.objects.length;i++){
			var object = this.objects[i];
			var pos = object.physics.destination;
			var tiles = this.tileMap.getSurroundTile(pos,"through");
			for(var ii=0; ii<tiles.length; ii++){
				var objBox = object.getDestinationBoundingBox();
				if(tiles[ii].status == false){
					continue;
				}
				if(ii<4){
					switch (ii){
						case 1 :
							pos = (cc.p(pos.x,pos.y-rect.height));
							speed[1] = true;
							break;
						case 3 :
							pos = (cc.p(pos.x+rect.width,pos.y));
							speed[0] = true;
							break;
						case 5 :
							pos = (cc.p(pos.x-rect.width,pos.y));
							speed[0] = true;
							break;
						case 7 :
							pos = (cc.p(pos.x,pos.y+rect.height));
							speed[1] = true;
							break;						
					}					
				}
				
				
				
				
				var result = cc.rectIntersectsRect(objBox,tiles[ii].rect);
				console.log(tiles[ii].rect);
				if(result == true){
					var rect = cc.rectIntersection(objBox,tiles[ii].rect);
					var speed = [false,false];
					switch (ii){
						case 0 :
							if (rect.width>=rect.height){
								pos = (cc.p(pos.x+rect.width,pos.y));
								speed[0] = true;
							}
							else{
								pos = (cc.p(pos.x,pos.y-rect.height));
								speed[1] = true;
							}
							break;
						case 1 :
							pos = (cc.p(pos.x,pos.y-rect.height));
							speed[1] = true;
							break;
						case 2:
							if (rect.width>=rect.height){
								pos = (cc.p(pos.x-rect.width,pos.y));
								speed[0] = true;
							}
							else{
								pos = (cc.p(pos.x,pos.y-rect.height));
								speed[1] = true;
							}
							break;
						case 3 :
							pos = (cc.p(pos.x+rect.width,pos.y));
							speed[0] = true;
							break;
						case 4 :
							cc.log("invalid position!");
							break;
						case 5 :
							pos = (cc.p(pos.x-rect.width,pos.y));
							speed[0] = true;
							break;
						case 6 :
							if (rect.width>=rect.height){
								pos = (cc.p(pos.x+rect.width,pos.y));
								speed[0] = true;
							}
							else{
								pos = (cc.p(pos.x,pos.y+rect.height));
								speed[1] = true;
							}
							break;
						case 7 :
							pos = (cc.p(pos.x,pos.y+rect.height));
							speed[1] = true;
							break;
						case 8 :
							if (rect.width>=rect.height){
								pos = (cc.p(pos.x-rect.width,pos.y));
								speed[0] = true;
							}
							else{
								pos = (cc.p(pos.x,pos.y+rect.height));
								speed[1] = true;
							}
							break;							
					}
					if(speed[0] == true){
						object.setSpeed(cc.p(0,object.getSpeed().y));
					}
					if(speed[1] == true){
						object.setSpeed(cc.p(object.getSpeed().x,0));
					}
					object.physics.destination = pos;
					
				}

			}
			console.log(pos);
			object.setPosition(pos);
		}
	},
	
	updateDestination:function(){
		for(var i=0;i<this.objects.length;i++){
			var v = this.objects[i].getSpeed();
			v=cc.p(v.x+this.config.gravity.x,v.y+this.config.gravity.y);
			this.objects[i].setSpeed(v);
			var pos = this.objects[i].getPosition();
			this.objects[i].physics.destination = cc.p(pos.x+v.x,pos.y+v.y);
		}
	}
	
})
