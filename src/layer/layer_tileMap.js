var layer_tileMap = cc.Layer.extend({
	myBox:null,
	space:null,
	ctor:function(){
		this._super();
		this._map = new baseTMXTiledMap(res.tmx_map1);
		this.addChild(this._map,-1);
		globalVars.tileMap = this._map;
		this._map.getVisableTiles(cc.p(300,300));
		this.test();
		//this.y = 100;

		var space = new Space({},this._map);
		this.addChild(space);
		this.space = space;
		
		var box = new MyBox();
		this.addChild(box);
		globalVars.myBox = box;
		space.addObject(box);
		this.myBox = box;
		
		var box = new Box();
		this.addChild(box);
		space.addObject(box);
		
		this.scheduleUpdate();
	},
	
	test:function(){
		var rect = cc.rect(0,0,100,100);
	},
	
	update:function(){
		this.updateViewPiont();
	},
	
	updateViewPiont:function(){
		var size = cc.director.getWinSize();
		var position = this.myBox.getPosition();
		var positionOfView  = (position.x+this.x)/size.width;
		if(positionOfView<0.3){
			this.x = (0.3*size.width)-position.x;
		}
		else if(positionOfView>0.7){
			this.x = (0.7*size.width)-position.x;
		}
		//console.log(this.x);
	},
});
