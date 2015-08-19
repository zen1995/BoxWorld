var Scene_main=cc.Scene.extend({
	ctor:function(){
		this._super();
		//this.initGameInfo();
		var colorLayer=new Layer_background();	
		this.addChild(colorLayer,-1);
		
		var tmxLayer = new layer_tileMap();
		this.addChild(tmxLayer,1);
		

		 
	},
	
//	initGameInfo:function(){
//		gameConstant.winSize.width = cc.director.getWinSize().width;
//		gameConstant.winSize.height = cc.director.getWinSize().height;
//	}
});