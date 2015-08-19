var layer_tileMap = cc.Layer.extend({
	ctor:function(){
		this._super();
		this._map = new baseTMXTiledMap(res.tmx_map1);
		this.addChild(this._map,-1);
		this.test();
		
		var box = new MyBox();
		this.addChild(box);
		
		var space = new Space({},this._map);
		this.addChild(space);
		
		space.addObject(box);
	},
	
	test:function(){
		var rect = cc.rect(0,0,100,100);
		console.log(rect);
	}
});
