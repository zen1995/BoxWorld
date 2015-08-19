var baseTMXTiledMap = cc.TMXTiledMap.extend({
	ctor:function(map){
		this._super(map);
	},
	/**
	 * 瓦片地图坐标原点在左上角
	 * 获取某一瓦片左上角的坐标
	 * @param {cc.p}	p
	 * @return {cc.p}	 返回cocos坐标系下的坐标
	 */
	getGameSpacePosition:function(p){//x,y为瓦片地图坐标系 
		return cc.p( this.getTileSize().width*p.x,
			(this.mapHeight-p.y)*this.getTileSize().height);
	},
	
	/**
	 * 获取tile坐标系下给定点的坐标(game)
	 * @param  {cc.p} 
	 * @return {cc.p}
	 */
	getTileSpacePosition:function(p){
		var x = Math.floor(p.x/this.getTileSize().width);
		var y=((this.mapHeight*this.getTileSize().height)-p.y)/this.getTileSize().height;
		y=Math.floor(y);
		return cc.p(x,y);
	},
	/**
	 * 由game坐标获取坐标周围的瓦片信息
	 * @param {cc.p} p
	 * @param {string} layerName
	 * @return {Array} 
	 * 4 0 5
	 * 1   2
	 * 6 3 7
	 */
	getSurroundTile:function(p,layerName){
		p = this.getTileSpacePosition(p);
		var posArray = new Array();
		var layer = this.getLayer(layerName);
		for(var i=0;i<9;i++){
			var column = i%3;//列
			var row = Math.floor(i/3);//行
			var tilePos = cc.p(p.x+column-1,p.y+row-1);
			var info = new Object;
			if(tilePos.x<0||tilePos.x>=this.mapWidth||tilePos.y<0||tilePos.y>= this.mapHeight){
				info.status = false;
				posArray.push(info);
				continue;
			}
			var tileId = layer.getTileGIDAt(tilePos);
			
			if(tileId <= 0){
				info.status = false;
			}
			else{
				var property=this.getPropertiesForGID(tileId);//get property
				var collision=property['through'];
				if(collision=='true'){
					var pos = this.getGameSpacePosition(tilePos);
					info.rect = cc.rect(pos.x,pos.y-this.getTileSize().height,
						this.getTileSize().width,this.getTileSize().height);
					info.status =true;
				}
				else{
					info.status = false;
				}				
			}
			posArray.push(info);
		}
	 	var returnArray = new Array(
	 		posArray[1],posArray[3],posArray[5],
	 		posArray[7],posArray[0],
	 		posArray[2],posArray[6],posArray[8]
	 	);
	 	return returnArray;
		
	}
});


var basePhysicsObject = cc.Sprite.extend({
	physics:{
		destination:null,
		speed:null
	},
	ctor:function(sprite){
		this._super(sprite);
	},
	
	getDestinationBoundingBox:function(){
		var box = this.getBoundingBox();
		var pos = this.getPosition();
		var des = this.physics.destination;
		var s = cc.p(des.x-pos.x,des.y-pos.y);
		return cc.rect(box.x+s.x,box.y+s.y,box.width,box.height);
	},
	
	getSpeed:function(){
		return this.physics.speed;
	},
	
	setSpeed:function(speed){
		this.physics.speed = speed;
	}
});
