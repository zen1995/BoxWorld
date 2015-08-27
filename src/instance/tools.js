var Tools = {
	/**
	 * @description 取得对象在数组下的下标
	 * @param {Array} array
	 * @param {Object} obj
	 * @return {Number} i 若没有找到 返回-1
	 */
	getIndex:function(array,obj){
		for(var i=0;i<array.length;i++){
			if(array[i] == obj){
				return i;
			}
		}
		return -1;
	},
	
	calculateDistance:function(p1,p2){
		return Math.sqrt((p1.x-p2.x)*(p1.x-p2.x) + (p1.y-p2.y)*(p1.y-p2.y));
	},
	
	calculateCenterPoint:function(p1,p2){
		return cc.p((p1.x+p2.x)/2 , (p1.y+p2.y)/2);
	},
	/**
	 * 判断射线与线段是否相交 若相交，则返回交点
	 * @param {[cc.p,cc.p]} beam
	 * @param {[cc.p,cc.p]} edge
	 * @return {Boolean || cc.p}
	 */
	beamIntersectEdge:function(beam,edge,drawNode){
		var v = cc.p(beam[1].x-beam[0].x,beam[1].y-beam[0].y);
		var distance = Math.sqrt(v.x*v.x+v.y*v.y);
		var v2 = cc.p(v.x/distance*1080,v.y/distance*1080);
		var p2 = cc.p(beam[0].x+v2.x,beam[0].y+v2.y)
		if( cc.pSegmentIntersect(beam[0],p2,edge[0],edge[1]) == false){
			return false;
		}
		var returnPoint = cc.pIntersectPoint(beam[0],p2,edge[0],edge[1]);
		drawNode.drawSegment(beam[0], returnPoint, 2, cc.color(255, 0, 0, 255));
		//console.log(beam[0],p2,edge[0],edge[1]);
		return returnPoint
	}
}
