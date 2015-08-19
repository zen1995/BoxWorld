var Layer_background=cc.LayerColor.extend({
	ctor:function(){
		var size=cc.director.getWinSize();
		this._super(cc.color(225,225,225),size.width,size.height);
	}
})
