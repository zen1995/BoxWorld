var layer_tileMap = cc.Layer.extend({
	ctor:function(){
		this._super();
		this._map = new baseTMXTiledMap(res.tmx_map1);
		this.addChild(this._map,-1);
		this.test();

		var space = new Space({},this._map);
		this.addChild(space);
		
		var box = new MyBox();
		this.addChild(box);
		globalVars.myBox = box;
		space.addObject(box);
		
		var box = new Box();
		this.addChild(box);
		space.addObject(box);
	},
	
	test:function(){
		var rect = cc.rect(0,0,100,100);
		//console.log(rect);
	}
});
