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
	}
}
