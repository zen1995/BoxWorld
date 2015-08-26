var baseTMXTiledMap = cc.TMXTiledMap.extend({
	ctor:function(map){
		this._super(map);
		this.testDraw = new cc.DrawNode();
		this.addChild(this.testDraw,10);
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
		
	},
	
	getTileGIDAtPos:function(tilePos,layerName){
		var tileId;
		var layer = this.getLayer(layerName);
		if(tilePos.x<0||tilePos.x>=this.mapWidth||tilePos.y<0||tilePos.y>= this.mapHeight){
			tileId = -1;
		}
		else{
			tileId = layer.getTileGIDAt(tilePos);
		}
		
		return tileId;
	},
	
//-----------------光线效果所需函数----------------------

	/**
	 * 
	 * @param {cc.p} p tile坐标系中的坐标
	 * @param {String} layerName
	 */
	getTileOfLayer:function(p,layerName){
		var tile = new Object;
		var tileId = this.getTileGIDAtPos(p,layerName);
		if(tileId <= 0){
			tile.status = false;
		}
		else{
			tile = this.constructTileInfo(p)
		}
		return tile;
	},
	
	/**
	 * 
	 *@param {cc.p} p tile坐标系中的坐标
	 */
	constructTileInfo:function(p){
		var tile = new Object;
		tile.status = true;
		tile.edges = new Array();
		tile.p = p;
		//1 2
		//3 4
		//console.log(p);
		var tileSize = this.getTileSize();
		var p1 = this.getGameSpacePosition(p);
		var p2 = cc.p(p1.x+tileSize.width,p1.y);
		var p3 = cc.p(p1.x+tileSize.width,p1.y-tileSize.height);
		var p4 = cc.p(p1.x,p1.y-tileSize.height);

		tile.edges.push(game.edge(p1,p2),game.edge(p2,p3),game.edge(p3,p4),game.edge(p4,p1));
		return tile;
	},
	
	getVisableTiles:function(p){
		var parent = this.getParent();
		var p0 = parent.getPosition();
		var p1 = this.getTileSpacePosition(p0);
		var p2 = this.getTileSpacePosition(cc.p(p0.x+gameConstant.winSize.width,
			p0.y+gameConstant.winSize.height));
		var tiles = new Array();
		//获取显示到的瓦片信息
		for(var i= p1.x-1,j=0;i<=p2.x+1;i++,j++){
			tiles[j] = new Array();
			for(var ii=p2.y-1,k=0;ii<=p1.y+1;ii++,k++){
				if(i==p1.x-1||i==p2.x+1){// left
					tiles[j][k] = this.constructTileInfo( cc.p(i,ii) )
				}
				else if(i==p2.x+1){// right
					tiles[j][k] = this.constructTileInfo( cc.p(i,ii) )
				}
				else{
					if(ii==p2.y-1){//up
						tiles[j][k] = this.constructTileInfo( cc.p(i,ii) )
					}
					else if(ii==p1.y+1){//down
						tiles[j][k] = this.constructTileInfo( cc.p(i,ii) )
					}
					else{
						tiles[j][k] = this.getTileOfLayer(cc.p(i,ii),"through");						
					}
				}
			}
		}

		//获取tile的中的未被重叠edge信息
		var edges = new Array();
		for(var i=0;i<tiles.length;i++){
			for(var ii=0;ii<tiles[i].length;ii++){
				var tile = tiles[i][ii];
				if(tile.status == false){
					continue;
				}
				//处于边缘的边不考虑
				var d = [true,true,true,true];//up right down left
				if(ii == 0 || p.y<this.getGameSpacePosition(tile.p).y){//up
					d[0] = false;
				}
				if(ii == tiles[i].length-1 
					|| p.y>this.getGameSpacePosition(tile.p).y-this.getTileSize().height){//down
					d[2] = false
				}
				if(i == 0 || p.x>this.getGameSpacePosition(tile.p).x){// left
					d[3] = false;
				}
				if(i == tiles.length || p.x<this.getGameSpacePosition(tile.p).x+this.getTileSize().width){//right
					d[1] == false
				}
				if(d[3] && i>0 && tiles[i-1][ii].status == false ){//left tile do not exist
					var centerPoint = Tools.calculateCenterPoint(tile.edges[3].p1,tile.edges[3].p2);
					tile.edges[3].destance = Tools.calculateDistance(centerPoint,p);
					edges.push(tile.edges[3] );
				}
				if(d[0] && ii>0 && tiles[i][ii-1].status == false){//up 
					var centerPoint = Tools.calculateCenterPoint(tile.edges[0].p1,tile.edges[0].p2);
					tile.edges[0].destance = Tools.calculateDistance(centerPoint,p);
					edges.push(tile.edges[0]);
				}
				if(i+1<tiles.length && tiles[i+1][ii].status == false && d[1]){//right
					var centerPoint = Tools.calculateCenterPoint(tile.edges[1].p1,tile.edges[1].p2);
					tile.edges[1].destance = Tools.calculateDistance(centerPoint,p);
					edges.push(tile.edges[1]);
				}
				if(ii+1<tiles[i].length && tiles[i][ii+1].status == false && d[2]){//down
					var centerPoint = Tools.calculateCenterPoint(tile.edges[2].p1,tile.edges[2].p2);
					tile.edges[2].destance = Tools.calculateDistance(centerPoint,p);
					edges.push(tile.edges[2]);
				}			
			}
		}
		//按 distance 排序
		for(var i=0;i<edges.length;i++){
			var minIndex = i;var ii=i;
			for(;ii<edges.length;ii++){
				if(edges[ii].distance < edges[minIndex].distance){
					minIndex = ii;
				}
			}
			var temp = edges[i];
			edges[i] = edges[minIndex];
			edges[minIndex] = temp;
		}
		
		//draw
		
		this.testDraw.clear();
		this.testDraw.drawDot(cc.p(300,300),10,cc.color(255,0,0))
		for(var i=0;i<edges.length;i++){
			this.testDraw.drawSegment(edges[i].p1, edges[i].p2, 2, cc.color(255, 255, 255, 255));
			//break;
		}
	},
	
	
});


var basePhysicsObject = cc.Sprite.extend({
	physics:{
		destination:null,
		speed:null,
		mass:null,
		status:null
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
