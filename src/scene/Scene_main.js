var Scene_main=cc.Scene.extend({
	ctor:function(){
		this._super();
		this.initGameInfo();
		var colorLayer=new Layer_background();	
		this.addChild(colorLayer,-1);
		
		var tmxLayer = new layer_tileMap();
		this.addChild(tmxLayer,1);
		
		var analog = new Layer_analogStick();
		this.addChild(analog,2);
		
		var attackStick = new Layer_attackStick();
		this.addChild(attackStick,2);
	},
	
	initGameInfo:function(){
		gameConstant.winSize.width = cc.director.getWinSize().width;
		gameConstant.winSize.height = cc.director.getWinSize().height;
	}
});